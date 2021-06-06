import { join, extname } from 'path';
import { existsSync } from "fs";
import { cwd } from "process";
import _ from 'lodash';

const normalizeExtension = (ext) => {
  const extNormalizeMap = {
    yml: 'yaml',
  }

  return _.get(extNormalizeMap, ext, ext);
}

export const normalizePath = (path) => {
  if (existsSync(path)) {
    return path;
  }

  const absolutePath = join(cwd(), path);
  return existsSync(absolutePath) ? absolutePath : null;
}

export const getFileExt = (path) => {
  const ext = extname(path);
  return normalizeExtension(ext.startsWith('.') ? ext.slice(1) : ext);
}

