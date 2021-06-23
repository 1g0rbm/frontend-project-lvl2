import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFullPath = (fileName) => join(__dirname, '__fixtures__', fileName);

test.each([
  {
    filepath1: getFullPath('file1.json'),
    filepath2: getFullPath('file2.json'),
    format: 'stylish',
    expected: readFileSync(getFullPath('resultStylish.txt')).toString().trim(),
  },
  {
    filepath1: getFullPath('file1.yml'),
    filepath2: getFullPath('file2.yaml'),
    format: 'stylish',
    expected: readFileSync(getFullPath('resultStylish.txt')).toString().trim(),
  },
  {
    filepath1: getFullPath('file1.yml'),
    filepath2: getFullPath('file2.yaml'),
    format: 'plain',
    expected: readFileSync(getFullPath('resultPlain.txt')).toString().trim(),
  },
  {
    filepath1: getFullPath('file1.yml'),
    filepath2: getFullPath('file2.yaml'),
    format: 'json',
    expected: readFileSync(getFullPath('resultJson.json')).toString().trim(),
  },
])('genDiff($filepath1, $filepath2, $format)', ({
  filepath1, filepath2, format, expected,
}) => {
  expect(genDiff(filepath1, filepath2, format)).toBe(expected);
});

test('invalid file paths', () => {
  const filepath = getFullPath('file1.json');

  expect(() => genDiff('./invalid/path/file.json', filepath))
    .toThrowError('Filepath "./invalid/path/file.json" is incorrect.');

  expect(() => genDiff(filepath, './invalid/path/file.json'))
    .toThrowError('Filepath "./invalid/path/file.json" is incorrect.');
});
