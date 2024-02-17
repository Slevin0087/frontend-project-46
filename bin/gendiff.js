#!/usr/bin/env node
import { program } from 'commander';
import path from 'node:path';
import parseFiles from '../lib/parseJSON';

const cwd = process.cwd();

function resolveAndParse(filepath1, filepath2) {
  return parseFiles(path.resolve(cwd, filepath1), path.resolve(cwd, filepath2));
}

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format');

program
  .arguments('<filepath1> <filepath2>')
  .action(resolveAndParse);

program.parse();
