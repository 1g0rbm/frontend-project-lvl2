import { cwd } from 'process';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import _ from 'lodash';

const normalizePath = (path) => {
  if (existsSync(path)) {
    return path;
  }

  const absolutePath = join(cwd(), path);
  return existsSync(absolutePath) ? absolutePath : null;
};

const getFormattedDiff = (diff) => JSON.stringify(diff, null, '\t');

const genDiff = (filepath1, filepath2) => {
  const normalisedFilepath1 = normalizePath(filepath1);
  if (!normalisedFilepath1) {
    throw new Error(`<filepath1> value "${filepath1}" is incorrect.`);
  }
  const normalisedFilepath2 = normalizePath(filepath2);
  if (!normalisedFilepath2) {
    throw new Error(`<filepath2> value "${filepath2}" is incorrect.`);
  }

  const file1 = readFileSync(normalisedFilepath1);
  const file2 = readFileSync(normalisedFilepath2);

  const data1 = JSON.parse(file1.toString());
  const data2 = JSON.parse(file2.toString());

  const keys = _.uniq(_.sortBy([...Object.keys(data1), ...Object.keys(data2)]));
  const diff = keys
    .reduce((acc, key) => {
      const val1 = _.get(data1, key);
      const val2 = _.get(data2, key);

      if (val1 === val2) {
        return [...acc, [`  ${key}`, val1]];
      }

      return [
        ...acc,
        [`- ${key}`, val1],
        [`+ ${key}`, val2],
      ];
    }, [])
    .filter(([, val]) => val !== undefined)
    .reduce((acc, [key, val]) => ({ ...acc, ...{ [key]: val } }), {});

  return getFormattedDiff(diff);
};

export default genDiff;
