import { load } from 'js-yaml';

const parsingFiles = (file, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(file);
    case 'yaml':
      return load(file);
    case 'yml':
      return load(file);
    default:
      throw new Error(`Unkown format ${format}`);
  }
};

export default parsingFiles;
