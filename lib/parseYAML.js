import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';

const f1Y = '../__fixtures__/fileY1.json';

const readF = readFileSync(f1Y, { encoding: 'utf-8' });
console.log(typeof readF);
//const parseFile1 = JSON.parse(readF);
  //const parseFile2 = JSON.parse(readFileSync(file2));
//console.log(parseFile1);
const parseY1 = yaml.load(readF);
console.log(parseY1);
/*const parseYAML = (file1) => {
  const parseS1 = readFileSync(file1);
  console.log('jsInstr: ' + parseS1);
  const parseFile1 = JSON.parse(file1);
  //const parseFile2 = JSON.parse(readFileSync(file2));
  console.log(parseFile1);
  //const parseY1 = yaml.load(parseFile1);
  //console.log('yamPars: ' + parseY1);
  //const parseFile2 = yaml.load(readFileSync(file2));
  return parseFile1;
};*/

//const f1Y = '../__fixtures__/fileY1.json';
//const f2Y = '../__fixtures__/fileY2.json';

//console.log(parseYAML(f1Y));

//export default parseYAML;