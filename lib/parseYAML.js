import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';

const parseYAML = (file1, file2) => {
  const parseFile1 = yaml.load(readFileSync(file1));
  const parseFile2 = yaml.load(readFileSync(file2));
  return [parseFile1, parseFile2];
};

export default parseYAML;
