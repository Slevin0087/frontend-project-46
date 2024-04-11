import _ from 'lodash';
import { dirname } from 'path';
import path from 'node:path';
import parsingFiles from './parsers.js';
import { plain, stylish } from '../formatters/index.js';

const fixturePath = (fileName) => {
  const __dirname = dirname(fileName);
  return path.resolve(__dirname, '..', '__fixtures__', fileName);
};

const parseFiles = (file1, file2) => {
  const fileExtension1 = file1.split('.').at(-1);
  const fileExtension2 = file2.split('.').at(-1);
  const resultFile1 = parsingFiles(fixturePath(file1), fileExtension1);
  const resultFile2 = parsingFiles(fixturePath(file2), fileExtension2);
  return [resultFile1, resultFile2];
};

const createTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2));
  const result = keys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        type: 'recursion',
        key,
        value: createTree(obj1[key], obj2[key]),
      };
    }
    if (!Object.hasOwn(obj2, key)) {
      return { type: 'removed', key, value: obj1[key] };
    }
    if (!Object.hasOwn(obj1, key)) {
      return { type: 'added', key, value: obj2[key] };
    }
    if (obj1[key] === obj2[key]) {
      return { type: 'norm', key, value: obj1[key] };
    }
    return {
      type: 'reupdated',
      key,
      value: obj1[key],
      value2: obj2[key],
    };
  });
  return result;
};

const diff = (file1, file2, formatName = 'stylish') => {
  const [obj1, obj2] = parseFiles(file1, file2);
  const tree = createTree(obj1, obj2);
  if (formatName === 'plain') {
    return plain(tree).trim();
  }
  if (formatName === 'json') {
    return JSON.stringify(tree);
  }
  return stylish(tree);
};

export default diff;
