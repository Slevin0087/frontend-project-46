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

// console.log(fixturePath('fileYml2.yml'));

// const diff = (file1, file2) => {
//   const parseFile1 = [];
//   const file1Extension = file1.split('.').at(-1);
//   const file2Extension = file2.split('.').at(-1);
//   if (file1Extension && file2Extension === 'json') {
//     parseFile1.push(parseJSON(fixturePath(file1), fixturePath(file2)));
//     return parseFile1.flat();
//   }
// if ((file1Extension && file2Extension === 'yaml') || (file1Extension && file2Extension === 'yml')) {
//     parseFile1.push(parseYAML(fixturePath(file1), fixturePath(file2)));
//     return parseFile1.flat();
//   }
//   const tree = createTree(parseFile1);
//   return parseFile1;
// };

// console.log(diff('file1.json', 'file2.json'));
// const parse = (file1, file2) => {
//   const file1Extension = file1.split('.').at(-1);
//   const file2Extension = file2.split('.').at(-1);
//   if (file1Extension && file2Extension === 'json') {
//     parseJSON(file1, file2);
//     return;
//   }
//   if ((file1Extension && file2Extension) === ('yaml' || 'yml')) {
//     parseYAML(file1, file2);
//   }
// };

// console.log(parse('file1.json', 'file2.json'));

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
  // console.log([file1Extension, file2Extension]);
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
  // console.log('arr:', arr[0]);
  // const parseFlat = parseFiles.flat();
  // console.log('parseFlat:', parseFlat);
  const tree = createTree(arr);
  // console.log('tree:', tree);
  // if (formatName === 'json') {
  //   return formatterJson(tree);
  // }
  // if (formatName === ('yaml' || 'yml')) {
  //   return formatter(tree);
  // }
  // if (formatName === 'stylish') stylish(tree);
  if (formatName === 'plain') {
    return plain(tree);
  }
  if (formatName === 'json') {
    return json(tree);
  }
  return stylish(tree);
};

// console.log('diff:', diff('fileJ1.json', 'fileJ2.json', 'stylish'));

// const myArr = [
//   {
//     common: {
//       setting1: 'Value 1',
//       setting2: 200,
//       setting3: true,
//       setting6: { key: 'value', doge: { wow: '' } },
//     },
//     group1: { baz: 'bas', foo: 'bar', nest: { key: 'value' } },
//     group2: { abc: 12345, deep: { id: 45 } },
//   },
//   {
//     common: {
//       follow: false,
//       setting1: 'Value 1',
//       setting3: null,
//       setting4: 'blah blah',
//       setting5: { key5: 'value5' },
//       setting6: { key: 'value', ops: 'vops', doge: { wow: 'so much' } },
//     },
//     group1: { foo: 'bar', baz: 'bars', nest: 'str' },
//     group3: { deep: { id: { number: 45 } }, fee: 100500 },
//   }
// ];

// const arr1 = [
//   {
//     host: 'hexlet.io',
//     timeout: 50,
//     proxy: '123.234.53.22',
//     follow: false,
//   },
//   { timeout: 20, verbose: true, host: 'hexlet.io' },
// ];

// const tree1 = createTree(myArr);
// console.log(tree1[0]);
// const tree = createTree(myArr);
// console.log(tree);

export default diff;
