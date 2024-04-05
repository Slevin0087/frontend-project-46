import { readFileSync } from 'node:fs';
// import path from 'node:path';

// const f1 = 'file1.json';
// console.log(f1);
// const f2 = 'file2.json';
// console.log(f2);

const parseJSON = (file1, file2) => {
  const parseFile1 = JSON.parse(readFileSync(file1));
  const parseFile2 = JSON.parse(readFileSync(file2));
  return [parseFile1, parseFile2];
};

// const pa = parse(f1, f2);
// const pa0 = pa[1];
// console.log(pa);
// const pathFile = 'file1.json';
// const __dirname = dirname(pathFile);

// const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
// console.log(getFixturePath(pathFile));

// const filename = 'file1.yml';

// console.log(filename.split('.').at(-1));

export default parseJSON;
