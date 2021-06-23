import { readFileSync, existsSync } from 'fs';
import { getFileExt, getAbsolutePath } from './file.js';
import parse from './parsers.js';
import buildAstDiff from './astDiff.js';
import astToFormat from './formatters/index.js';

const getFileData = (path) => {
  const normalizePath = !existsSync(path) ? getAbsolutePath(path) : path;
  if (!existsSync(normalizePath)) {
    throw new Error(`Filepath "${path}" is incorrect.`);
  }

  const file = readFileSync(path);
  const ext = getFileExt(path);
  return parse(file, ext);
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const ast = buildAstDiff(getFileData(filepath1), getFileData(filepath2));
  return astToFormat(ast, format);
};

export default genDiff;
