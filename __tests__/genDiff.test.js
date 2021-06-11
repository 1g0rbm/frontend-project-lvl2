import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('base json flow', () => {
  const filepath1 = join(__dirname, '__fixtures__', 'file1.json');
  const filepath2 = join(__dirname, '__fixtures__', 'file2.json');

  const expected = readFileSync(join(__dirname, '__fixtures__', 'resultStylish.txt')).toString().trim();

  expect(genDiff(filepath1, filepath2)).toBe(expected);
});

test('base yml flow', () => {
  const filepath1 = join(__dirname, '__fixtures__', 'file1.yml');
  const filepath2 = join(__dirname, '__fixtures__', 'file2.yaml');

  const expected = readFileSync(join(__dirname, '__fixtures__', 'resultStylish.txt')).toString().trim();

  expect(genDiff(filepath1, filepath2)).toBe(expected);
});

test('plain parsing', () => {
  const filepath1 = join(__dirname, '__fixtures__', 'file1.yml');
  const filepath2 = join(__dirname, '__fixtures__', 'file2.yaml');

  const expected = readFileSync(join(__dirname, '__fixtures__', 'resultPlain.txt')).toString().trim();

  expect(genDiff(filepath1, filepath2, 'plain')).toBe(expected);
});

test('invalid file paths', () => {
  const filepath = join(__dirname, '__fixtures__', 'file1.json');

  expect(() => genDiff('./invalid/path/file.json', filepath))
    .toThrowError('<filepath1> value "./invalid/path/file.json" is incorrect.');

  expect(() => genDiff(filepath, './invalid/path/file.json'))
    .toThrowError('<filepath2> value "./invalid/path/file.json" is incorrect.');
});
