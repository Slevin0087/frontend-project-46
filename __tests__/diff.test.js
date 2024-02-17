import genDiff from '../lib/diff';

const correctValue = `{
    - follow: false
      host: hexlet.io
    - proxy: 123.234.53.22
    - timeout: 50
    + timeout: 20
    + verbose: true
}`;

test('gendiff', () => {
  const pathFile1 = './__fixtures__/file1.json';
  const pathFile2 = './__fixtures__/file2.json';
  expect(genDiff(pathFile1, pathFile2)).toEqual(correctValue);
});
