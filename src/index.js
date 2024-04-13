import { readFileSync } from 'node:fs';
import { dirname } from 'path';
import path from 'node:path';
import parsingFiles from './parsers.js';
import createTree from './tree.js';
import getFormatterTree from './formatters/index.js';

const fixturePath = (fileName) => {
  const __dirname = dirname(fileName);
  return path.resolve(__dirname, '..', '__fixtures__', fileName);
};

const fileExtension = (fileName) => fileName.split('.').at(-1);

const parseFile = (fileName) => parsingFiles(readFileSync(fixturePath(fileName), 'utf-8'), fileExtension(fileName));

const genDiff = (file1, file2, formatName = 'stylish') => {
  const obj1 = parseFile(file1);
  const obj2 = parseFile(file2);
  const tree = createTree(obj1, obj2);
  return getFormatterTree(tree, formatName);
};

export default genDiff;
