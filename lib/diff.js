import _ from 'lodash';
import path from 'path';
import * as url from 'url';
import { readFileSync } from 'node:fs';

import parseJSON from './parseJSON.js';

// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));



const genDiff = (f1, f2) => {
  const stack = [];
  const [o1, o2] = parseJSON(f1, f2);
  new Set(_.sortBy([...Object.keys(o1), ...Object.keys(o2)])).forEach((key) => {
    const valueF1 = o1[key];
    const valueF2 = o2[key];
    const obj1 = _.has(o1, key);
    const obj2 = _.has(o2, key);
    if (valueF1 === valueF2) {
      stack.push(`      ${key}: ${valueF1}`);
      return;
    }
    if ((obj1 && obj2) && (valueF1 !== valueF2)) {
      stack.push(`    - ${key}: ${valueF1}`);
      stack.push(`    + ${key}: ${valueF2}`);
    }
    if ((obj1 && !obj2)) {
      stack.push(`    - ${key}: ${valueF1}`);
      return;
    }
    if ((!obj1 && obj2)) {
      stack.push(`    + ${key}: ${valueF2}`);
    }
  });
  return ['{', ...stack, '}'].join('\n');
};

const f1Y = path.resolve(__dirname, '../__fixtures__/fileY1.json');
const f2Y = path.resolve(__dirname, '../__fixtures__/fileY2.json');

//console.log(genDiff(f1Y, f2Y))
export default genDiff;


//проверка типа вложенных 

// a = obj, b = obj
// a = obj, b != obj
// a != obj, b = obj

// a = arr, b = arr
// a = arr, b != arr
// a != arr, b = arr


// [
//   + a: 1
//   - a: 2
// ]

// [
//   + a.b: 1
// ]

// {
//   + a: {
//     + b: 1
//   }
// }

const ob1 = JSON.parse(readFileSync('../__fixtures__/fileY1.json'));
console.log(ob1);

const ob2 = JSON.parse(readFileSync('../__fixtures__/fileY2.json'));
//console.log(ob2);

//ДИФФ ПО ВЛОЖЕННЫМ ОБЪЕКТАМ

const diffObj1AndObj2 = (obj1, obj2) => {
  //let keys = [];
  const keysObj1 = Object.keys(obj1);
  const keysObj2 = Object.keys(obj2);
  console.log(keysObj1);
  //console.log(keysObj2);

  const chil1 = keysObj1.map((key) => {
    if (typeof obj1[key] === 'object') {
      diffObj1AndObj2(obj1[key]);
    }
  });
  //const chil2 = keysObj2.map((key) => obj2[key]);
  //console.log(chil1);
  //console.log(chil2);
  //return diffObj1AndObj2(chil1, chil2);
};

diffObj1AndObj2(ob1, ob2);
//console.log(ob1);
