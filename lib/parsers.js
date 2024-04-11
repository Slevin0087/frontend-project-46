import { readFileSync } from 'node:fs';
import { load } from 'js-yaml';

const parsingFiles = (file, format) => {
  const readFile = readFileSync(file);
  switch (format) {
    case 'json':
      return JSON.parse(readFile);
    case 'yaml':
      return load(readFile);
    case 'yml':
      return load(readFile);
    default:
      throw new Error(`Unkown format ${format}`);
  }
};

export default parsingFiles;
