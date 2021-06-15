import { readFileSync } from 'fs';
import { getFileExt, normalizePath } from './file.js';
import parse from './parsers.js';
import getAstDiff from './astDiff.js';
import render from './formatters/index.js';

const getFileData = (path) => {
  const file = readFileSync(path);
  const ext = getFileExt(path);
  return parse(file, ext);
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const normalisedFilepath1 = normalizePath(filepath1);
  if (!normalisedFilepath1) {
    throw new Error(`<filepath1> value "${filepath1}" is incorrect.`);
  }
  const normalisedFilepath2 = normalizePath(filepath2);
  if (!normalisedFilepath2) {
    throw new Error(`<filepath2> value "${filepath2}" is incorrect.`);
  }

  const ast = getAstDiff(getFileData(normalisedFilepath1), getFileData(normalisedFilepath2));
  return render(ast, format);
};

export default genDiff;
