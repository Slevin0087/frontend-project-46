import { readFileSync } from 'node:fs';

const parseJSON = (file1, file2) => {
  const parseFile1 = JSON.parse(readFileSync(file1));

  const parseFile2 = JSON.parse(readFileSync(file2));
  return [parseFile1, parseFile2];
};

export default parseJSON;
