#!/usr/bin/env node
import { program } from 'commander';
import  parseFiles  from '../lib/parseJSON.js';
import path from 'node:path';

const cwd = process.cwd();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .helpOption ('-h, --help', 'output usage information')
  .option ('-f, --format <type>', 'output format');

program
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    return console.log(parseFiles(path.resolve(cwd, filepath1), path.resolve(cwd, filepath2)))});

program.parse();
