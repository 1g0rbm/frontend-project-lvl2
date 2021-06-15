import { extname, join } from 'path';
import { existsSync } from 'fs';
import { cwd } from 'process';

export const normalizePath = (path) => {
  if (existsSync(path)) {
    return path;
  }

  const absolutePath = join(cwd(), path);
  return existsSync(absolutePath) ? absolutePath : null;
};

export const getFileExt = (path) => {
  const ext = extname(path);
  return ext.startsWith('.') ? ext.slice(1) : ext;
};
