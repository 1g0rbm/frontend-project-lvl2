import { readFileSync } from 'fs';
import { extname, join } from 'path';
import { cwd } from 'process';

export const getAbsolutePath = (path) => join(cwd(), path);

export const getFileExt = (path) => {
  const ext = extname(path);
  return ext.startsWith('.') ? ext.slice(1) : ext;
};

export const getFileContent = (path) => readFileSync(path).toString().trim();
