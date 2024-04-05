import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';

const parseYAML = (file1, file2) => {
  // console.log('p1: ' + yaml.load(readFileSync(file1)));
  const parseFile1 = yaml.load(readFileSync(file1));
  // console.log('p1: ' + parseFile1);
  const parseFile2 = yaml.load(readFileSync(file2));
  return [parseFile1, parseFile2];
};

// const f1Y = '../__fixtures__/fileYml1.yml';
// const f2Y = '../__fixtures__/fileYml2.yml';

// console.log(parseYAML(f1Y, f2Y));

//export default parseYAML;

export default parseYAML;
