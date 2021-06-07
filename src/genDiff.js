import { readFileSync } from 'fs';
import _ from 'lodash';
import { getFileExt, normalizePath } from './file.js';
import getParser from './parsers.js';

const getFormattedDiff = (diff) => JSON.stringify(diff, null, '\t');

const getFileData = (path) => {
  const file = readFileSync(path);
  const ext = getFileExt(path);
  return getParser(ext)(file);
};

const genDiff = (filepath1, filepath2) => {
  const normalisedFilepath1 = normalizePath(filepath1);
  if (!normalisedFilepath1) {
    throw new Error(`<filepath1> value "${filepath1}" is incorrect.`);
  }
  const normalisedFilepath2 = normalizePath(filepath2);
  if (!normalisedFilepath2) {
    throw new Error(`<filepath2> value "${filepath2}" is incorrect.`);
  }

  const data1 = getFileData(normalisedFilepath1);
  const data2 = getFileData(normalisedFilepath2);

  const keys = _.uniq(_.sortBy([...Object.keys(data1), ...Object.keys(data2)]));
  const diff = keys
    .reduce((acc, key) => {
      const val1 = _.get(data1, key);
      const val2 = _.get(data2, key);

      if (val1 === val2) {
        return [...acc, [`  ${key}`, val1]];
      }

      return [...acc, [`- ${key}`, val1], [`+ ${key}`, val2]];
    }, [])
    .filter(([, val]) => val !== undefined)
    .reduce((acc, [key, val]) => ({ ...acc, ...{ [key]: val } }), {});

  return getFormattedDiff(diff);
};

export default genDiff;
