import _ from 'lodash';
import { dirname } from 'path';
import path from 'node:path';
import parseJSON from './parseJSON.js';
import parseYAML from './parseYAML.js';
import { plain, stylish, json } from '../formatters/index.js'

const fixturePath = (fileName) => {
  const __dirname = dirname(fileName);
  return path.resolve(__dirname, '__fixtures__', fileName);
};

const createTree = (arr) => {
  const obj1 = arr[0];
  const obj2 = arr[1];
  const typeAdd = [];
  const keys = new Set(_.sortBy([...Object.keys(obj1), ...Object.keys(obj2)]));
  const arrKeys = Array.from(keys);
  arrKeys.forEach((key) => {
    if (!Object.hasOwn(obj1, key)) {
      typeAdd.push({ type: 'added', key, val: obj2[key] });
      return;
    }
    if (!Object.hasOwn(obj2, key)) {
      typeAdd.push({ type: 'removed', key, val: obj1[key] });
      return;
    }
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      typeAdd.push({ type: 'recursion', key, children: createTree([obj1[key], obj2[key]]) });
      return;
    }
    if (obj1[key] === obj2[key]) {
      typeAdd.push({ type: 'norm', key, val: obj1[key] });
    } else {
      typeAdd.push({ type: 'reupdated', key, val: obj1[key] });
      typeAdd.push({ type: 'updated', key, val: obj2[key] });
    }
  });
  return typeAdd;
};

const parseFiles = (file1, file2) => {
  const parse = [];
  const file1Extension = file1.split('.').at(-1);
  const file2Extension = file2.split('.').at(-1);
  if (file1Extension && file2Extension === 'json') {
    parse.push(parseJSON(fixturePath(file1), fixturePath(file2)));
  }
  if ((file1Extension && file2Extension === 'yaml') || (file1Extension && file2Extension === 'yml')) {
    parse.push(parseYAML(fixturePath(file1), fixturePath(file2)));
  }
  return parse.flat();
};

const diff = (file1, file2, formatName = 'stylish') => {
  const arr = parseFiles(file1, file2);
  const tree = createTree(arr);
  if (formatName === 'plain') {
    return plain(tree);
  }
  if (formatName === 'json') {
    return json(tree);
  }
  return stylish(tree);
};

// console.log(diff('fileY1.yml', 'fileY2.yml', 'json'));

export default diff;
