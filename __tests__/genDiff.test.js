import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('base json flow', () => {
  const filepath1 = join(__dirname, '__fixtures__', 'file1.json');
  const filepath2 = join(__dirname, '__fixtures__', 'file2.json');

  expect(genDiff(filepath1, filepath2))
    .toBe(JSON.stringify({
      '- follow': false,
      '  host': 'hexlet.io',
      '- proxy': '123.234.53.22',
      '- timeout': 50,
      '+ timeout': 20,
      '+ verbose': true,
    }, null, '\t'));

  expect(genDiff(filepath2, filepath1))
    .toBe(JSON.stringify({
      '+ follow': false,
      '  host': 'hexlet.io',
      '+ proxy': '123.234.53.22',
      '- timeout': 20,
      '+ timeout': 50,
      '- verbose': true,
    }, null, '\t'));
});

test('invalid file paths', () => {
  const filepath = join(__dirname, '__fixtures__', 'file1.json');

  expect(() => genDiff('./invalid/path/file.json', filepath))
    .toThrowError('<filepath1> value "./invalid/path/file.json" is incorrect.');

  expect(() => genDiff(filepath, './invalid/path/file.json'))
    .toThrowError('<filepath2> value "./invalid/path/file.json" is incorrect.');
});
