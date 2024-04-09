#!/usr/bin/env node
import { program } from 'commander';
import diff from '../index.js'
import { plain, stylish, json } from '../formatters/index.js';
// import path from 'node:path';
// import { dirname } from 'path';
// import parseJSON from '../lib/parseJSON.js';
// import parseYAML from '../lib/parseYAML.js';
// import createTree from '../lib/diff.js';
// import { formatterJson, formatter, formatterPlain } from '../formatters/index.js'

// const fixturePath = (fileName) => {
//   const __dirname = dirname(fileName);
//   return path.resolve(__dirname, '__fixtures__', fileName);
// };

// const parse = (file1, file2) => {
//   const file1Extension = file1.split('.').at(-1);
//   const file2Extension = file2.split('.').at(-1);
//   if (file1Extension && file2Extension === 'json') {
//     return parseJSON(fixturePath(file1), fixturePath(file2));
//   }
//   if ((file1Extension && file2Extension === 'yaml') || (file1Extension && file2Extension === 'yml')) {
//     return parseYAML(fixturePath(file1), fixturePath(file2));
//   }
// };

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format', 'plain')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    // const parses = parse(filepath1, filepath2);
    // // console.log(parses);
    // const diff = createTree(parses);
    // // console.log(diff);
    // if (options.format) {
    // const formatterAst = formatterJson(diff);
    // }
    // return console.log(formatterAst);
    // console.log(formatterAst);
    // const plainFormatter = formatterPlain(diff, '');
    // console.log(plainFormatter);
    // const jsonFormatter = formatterJson(diff);
    // console.log(jsonFormatter);
    // const form = program.opts;
    console.log(diff(filepath1, filepath2, options.format));
    // console.log(diff(filepath1, filepath2, program.opts().format));
  });

program.parse();
