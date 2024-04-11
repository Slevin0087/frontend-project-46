import { dirname } from 'path';
import path from 'node:path';
import parsingFiles from '../lib/parsers.js';
import createTree from '../lib/diff.js';
import { plain } from '../formatters/index.js';

const fixturePath = (fileName) => {
  const __dirname = dirname(fileName);
  return path.resolve(__dirname, '..', '__fixtures__', fileName);
};

const correctValue = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

test('diff', () => {
  const parseFile1 = parsingFiles(fixturePath('fileJ1.json'));
  const parseFile2 = parsingFiles(fixturePath('fileJ2.json'));
  expect(plain(createTree(parseFile1, parseFile2))).toEqual(correctValue);
});
