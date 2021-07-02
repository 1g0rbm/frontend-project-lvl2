import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import getFileContent from './helpers/loadContent';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFullPath = (fileName) => join(__dirname, '__fixtures__', fileName);

test.each([
  {
    filepath1: 'file1.json',
    filepath2: 'file2.json',
    format: 'stylish',
    expected: 'resultStylish.txt',
  },
  {
    filepath1: 'file1.yml',
    filepath2: 'file2.yaml',
    format: 'stylish',
    expected: 'resultStylish.txt',
  },
  {
    filepath1: 'file1.yml',
    filepath2: 'file2.yaml',
    format: 'plain',
    expected: 'resultPlain.txt',
  },
  {
    filepath1: 'file1.yml',
    filepath2: 'file2.yaml',
    format: 'json',
    expected: 'resultJson.json',
  },
])('genDiff($filepath1, $filepath2, $format)', ({
  filepath1, filepath2, format, expected,
}) => {
  const normalizePath1 = getFullPath(filepath1);
  const normalizePath2 = getFullPath(filepath2);
  const normalizeExpected = getFileContent(getFullPath(expected));

  expect(genDiff(normalizePath1, normalizePath2, format)).toBe(normalizeExpected);
});

test('default formatter shuold be stylish', () => {
  const normalizePath1 = getFullPath('file1.yml');
  const normalizePath2 = getFullPath('file2.yaml');
  const normalizeExpected = getFileContent(getFullPath('resultStylish.txt'));

  expect(genDiff(normalizePath1, normalizePath2)).toBe(normalizeExpected);
});

test('invalid file paths', () => {
  const filepath = getFullPath('file1.json');

  expect(() => genDiff('./invalid/path/file.json', filepath))
    .toThrowError('Filepath "./invalid/path/file.json" is incorrect.');

  expect(() => genDiff(filepath, './invalid/path/file.json'))
    .toThrowError('Filepath "./invalid/path/file.json" is incorrect.');
});
