import parseFiles from './parseJSON.js';
import _ from 'lodash';

//const pathFile1 = '../fixtures/file1.json';

//const pathFile2 = '../fixtures/file2.json';

const genDiff = (f1, f2) => {
  const stack = [];
  const [o1, o2] = parseFiles(f1, f2);
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

export default genDiff;
