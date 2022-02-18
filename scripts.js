#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const fs = require('fs');
const path = require('path');

yargs(hideBin(process.argv))
  .command(
    'generate-gist [gistId]',
    'Generate a gist.',
    (yargs) => (
      yargs
        .positional('gistId', {
          describe: 'ID to for the gist'
        })
    ),
    (argv) => {
      const gistName = argv.gistId.split('/').pop();
      const htmlFiles = getNameArray(argv.html, gistName).map(name => nameToFileObject(name, "html"));
      const cssFiles = getNameArray(argv.css, gistName).map(name => nameToFileObject(name, "css"));
      const jsFiles = getNameArray(argv.js, gistName).map(name => nameToFileObject(name, "js"));
      const tsFiles = getNameArray(argv.ts, gistName).map(name => nameToFileObject(name, "ts"));
      const files = [...htmlFiles, ...cssFiles, ...jsFiles, ...tsFiles];
      const json = {
        title: argv.title || null,
        showFileNames: argv.fileNames,
        result: argv.result,
        files,
      }
      const dir = "src/assets/gists";
      const gistPath = path.resolve(__dirname, dir, argv.gistId);
      fs.mkdirSync(gistPath, { recursive: true });
      fs.writeFileSync(path.resolve(gistPath, 'index.json'), JSON.stringify(json, null, 2));
      files.forEach(file => {
        fs.writeFileSync(path.resolve(gistPath, file.name), '', { flag: 'a' });
      });
    }
  )
  .option('title', {
    alias: 't',
    type: 'string',
    description: 'Title of the gist'
  })
  .option('fileNames', {
    alias: 'fn',
    type: 'boolean',
    default: false,
    description: 'Show or hide names of files.'
  })
  .option('result', {
    alias: 'r',
    type: 'boolean',
    default: false,
    description: 'Show result or not'
  })
  .option('html', {
    alias: 'html',
    type: 'array',
    description: 'HTML Files. Leave flag empty for generating a single file.'
  })
  .option('css', {
    alias: 'css',
    type: 'array',
    description: 'CSS Files. Leave flag empty for generating a single file.'
  })
  .option('js', {
    alias: 'js',
    type: 'array',
    description: 'JS Files. Leave flag empty for generating a single file.'
  })
  .option('ts', {
    alias: 'ts',
    type: 'array',
    description: 'TS Files. Leave flag empty for generating a single file.'
  })
  .parse()

function nameToFileObject(name, fileType) {
  return {
    name: `${name}.${fileType}`,
    fileType,
  }
}

function getNameArray(arr, defaultName) {
  if(!arr) return [];
  if(arr.length == 0) return [ defaultName ];
  return arr;
}