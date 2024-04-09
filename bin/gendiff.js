#!/usr/bin/env node
import { program } from 'commander';
import diff from '../index.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    console.log(diff(filepath1, filepath2, options.format));
  });

program.parse();
