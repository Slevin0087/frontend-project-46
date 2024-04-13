import { readFileSync } from 'node:fs';
import { dirname } from 'path';
import path from 'node:path';
import genDiff from '../src/index.js';

const fixturePath = (fileName) => {
  const __dirname = dirname(fileName);
  return path.resolve(__dirname, '__fixtures__', fileName);
};

const readFile = (filename) => readFileSync(fixturePath(filename), 'utf-8');

// const stylishData = readFile('expectedStylish.txt'.trim());
// const stylishDataYaml = readFile('expectedstylish.txt'.trim());
// const plainData = readFile('expectedPlain.txt'.trim());
// const plainDataYaml = readFile('expectedPlain.txt'.trim());
// const jsonFormat = readFile('expectedJson.txt'.trim());
test('genDiff, json', () => {
  expect(
    genDiff('fileJ1.json', 'fileJ2.json', 'stylish'),
  ).toEqual(readFile('expectedStylish.txt'.trim()));
});
test('genDiff, yaml', () => {
  expect(
    genDiff('fileYaml1.yaml', 'fileYaml2.yaml', 'stylish'),
  ).toEqual(readFile('expectedstylish.txt'.trim()));
});

test('genDiff, json plain', () => {
  expect(
    genDiff('fileJ1.json', 'fileJ2.json', 'plain'),
  ).toEqual(readFile('expectedPlain.txt'.trim()));
});

test('genDiff, yml plain', () => {
  expect(
    genDiff('fileY1.yml', 'fileY2.yml', 'plain'),
  ).toEqual(readFile('expectedPlain.txt'.trim()));
});

test('genDiff, json JSON', () => {
  expect(
    genDiff('fileJ1.json', 'fileJ2.json', 'json'),
  ).toEqual(readFile('expectedJson.txt'.trim()));
});

test('genDiff, yml JSON', () => {
  expect(
    genDiff('fileYaml1.yml', 'fileYaml2.yml', 'json'),
  ).toEqual(readFile('expectedJson.txt'.trim()));
});
