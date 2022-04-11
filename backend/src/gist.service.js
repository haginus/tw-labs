const vm = require('vm');
const fs = require('fs');
const path = require('path');
const sinon = require('sinon');

function getServerInContext(code, gistPath, request) {
  return new Promise((resolve, reject) => {
    const methods = ['get', 'post', 'patch', 'put', 'delete', 'all'];

    let declarationIndex = 0;
    const routes = [];
    const middlewares = [];

    const listeners = { };
    methods.forEach(method => {
      listeners[method] = (path, ...handlers) => {
        const newHandlers = [
          ...middlewares
            .filter(m => m.declarationIndex < declarationIndex)
            .map(m => m.handler),
          ...handlers
        ];
        routes.push({ declarationIndex, method, path, handlers: newHandlers });
        declarationIndex++;
      }
    });

    listeners.use = handler => {
      middlewares.push({ declarationIndex, handler });
      declarationIndex++;
    }

    listeners.listen = () => {
      let handlers = [];
      const route = matchRoute(request, routes);
      if(!route) {
        const lastRouteIndex = routes.slice(-1)[0]?.declarationIndex || 0;
        handlers = middlewares
          .filter(m => m.declarationIndex > lastRouteIndex)
          .map(m => m.handler);
      } else {
        handlers = route.handlers;
      }

      if(handlers.length == 0) {
        reject('Not found.');
      }

      let response = { 
        send: (data) => resolve(data),
        sendFile: (filePath) => {
          let safePath = filePath;
          if(!safePath.startsWith(gistPath)) {
            safePath = path.join(gistPath, safePath);
          }
          const file = fs.readFileSync(safePath, 'utf8');
          return response.send(file);
        },
      };

      const runHandlers = async () => {
        for(const x of handlers) {
          await new Promise((resolve, reject) => x(request, response, resolve ));
        }
      };
      runHandlers();
    }

    const express = () => listeners;
    const sandbox = {
      express,
      console,
      setTimeout,
      __dirname: gistPath,
      require: (target) => {
        if(target.startsWith('.')) {
          return require(path.join(gistPath, target));
        }
        
        const packages = {
          express,
          path,
          fs,
          'body-parser': {
            json: () => (req, res, next) => { next() },
            urlencoded: () => (req, res, next) => { next() },
          }
        };
        return packages[target];
      },
      process: {
        env: {
          PORT: 3000,
          PWD: gistPath
        },
        cwd() {
          return gistPath;
        }
      },
    }
    vm.runInContext(code, vm.createContext(sandbox));
  });
}

function matchRoute(request, routes) {
  let { path, method } = request;
  method = method.toLowerCase();
  request.params = {};
  const pathSegments = path.split('/');

  return routes.find((route) => {
    if(method != route.method) return false;
    const segments = route.path.split('/');
    if (segments.length !== pathSegments.length) return false;
    return segments.every((segment, index) => {
      if (segment.startsWith('*')) return true;
      if(segment.startsWith(':')) {
        request.params[segment.slice(1)] = pathSegments[index];
        return true;
      }
      return segment === pathSegments[index];
    });
  });
}

async function getGist(gistId, request = null) {
  try {
    const gistPath = path.join(__dirname, `../gists/${gistId}`);
    const folder = fs.readdirSync(gistPath, { withFileTypes: true });
    const index = folder.find(file => {
      return ['index.js', 'server.js'].includes(file.name);
    });
    const files = getFiles(gistPath);
    const meta = {
      files,
      showFileNames: true,
      result: true
    };
    const code = fs.readFileSync(`${gistPath}/${index.name}`, 'utf8');
    if(!request) {
      return { meta };
    }
    const response = await getServerInContext(code, gistPath, request);
    return { response, meta };
  } catch (error) {
    console.log(error)
    return {};
  }
}

function getFiles(dir, call = 0) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  return files.flatMap(file => {
    if (file.isDirectory()) {
      return getFiles(`${dir}/${file.name}`, call + 1);
    }
    let fileType = file.name.split('.').pop();
    let name = file.name;
    let content = fs.readFileSync(`${dir}/${file.name}`, 'utf8');
    if(call > 0) {
      const relativeDir = dir.split('/').slice(-call).join('/');
      name = `${relativeDir}/${name}`;
    }
    return { name, fileType, content };
  });
}


function getNormalPath(initialPath) {
  const segemnts = initialPath.split('/').slice(3);
  let path = segemnts.join('/');
  if(!path.startsWith('/')) path = `/${path}`;
  return path;
}

module.exports = { getGist, getNormalPath };
