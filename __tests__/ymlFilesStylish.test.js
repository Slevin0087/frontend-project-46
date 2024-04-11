import { dirname } from 'path';
import path from 'node:path';
import parsingFiles from '../lib/parsers.js';
import createTree from '../lib/diff.js';
import { stylish } from '../formatters/index.js';

const fixturePath = (fileName) => {
  const __dirname = dirname(fileName);
  return path.resolve(__dirname, '__fixtures__', fileName);
};

const correctValue = `{
  common: {
    + follow: false
      setting1: Value 1
    - setting2: 200
    + setting3: true
    + setting3: null
    + setting4: blah blah
    + setting5: {
          key5: value5
      }
      setting6: {
          doge: {
            + wow:
            + wow: so much
          }
          key: value
        + ops: vops
      }
  }
  group1: {
    + baz: bas
    + baz: bars
      foo: bar
    + nest: {
          key: value
      }
    + nest: str
  }
- group2: {
      abc: 12345
      deep: {
          id: 45
      }
  }
+ group3: {
      deep: {
          id: {
              number: 45
          }
      }
      fee: 100500
  }
}`;

test('diff', () => {
  const parseFile1 = parsingFiles(fixturePath('fileY1.yml'));
  const parseFile2 = parsingFiles(fixturePath('fileY2.yml'));
  expect(stylish(createTree(parseFile1, parseFile2))).toEqual(correctValue);
});
