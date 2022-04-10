const vm = require('vm');
const fs = require('fs');
const path = require('path');
const sinon = require('sinon');

function getServerInContext(code, gistPath) {
  const methods = ['get', 'post', 'patch', 'put', 'delete', 'all'];

  const handlers = methods.reduce((acc, method) => ({ ...acc, [method]: {} }), {});
  const listeners = methods.reduce(
    (acc, method) => {
      acc[method] = (request) => {
        const fn = matchRoute(request, method, handlers);
        if(!fn) return {};
        const response = {
          sendFile: sinon.spy((filePath) => filePath),
          send: sinon.spy((data) => data),
        };
        const next = sinon.spy(() => ({}));
        fn(request, response, next);
        return { response, next };
      }
      return acc;
    },
    { listen: sinon.spy(() => ({})) }
  );

  const expressOverrides = methods.reduce((acc, method) => {
    acc[method] = (path, fn) => { handlers[method][path] = fn };
    return acc;
  }, {});

  const express = () => ({
    ...expressOverrides,
    listen: listeners.listen,
  });

  const sandbox = {
    express,
    console,
    __dirname: gistPath,
    require: (target) => {
      if(target.startsWith('.')) 
        return require(path.join(gistPath, target));
      
      const packages = {
        express,
        path,
        fs,
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
  return { listeners };
}

function matchRoute(request, method, handlers) {
  const { path } = request;
  request.params = {};
  const pathSegments = path.split('/');
  const handlersArr = Object.entries(handlers[method]).map(([path, fn]) => ({
    segments: path.split('/'),
    fn
  }));
  const matchingHandler = handlersArr.find(({ segments }) => {
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
  return matchingHandler?.fn;
}

function getGist(gistId) {
  try {
    const gistPath = path.join(__dirname, `../gists/${gistId}`);
    const folder = fs.readdirSync(gistPath, { withFileTypes: true });
    const index = folder.find(file => {
      const name = file.name;
      return name.startsWith('index') || name.startsWith('server')
    });
    const files = getFiles(gistPath);
    const meta = {
      files,
      showFileNames: true,
      result: true
    };
    const code = fs.readFileSync(`${gistPath}/${index.name}`, 'utf8');
    const { listeners } = getServerInContext(code, gistPath);
    return { listeners, meta };
  } catch (error) {
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
