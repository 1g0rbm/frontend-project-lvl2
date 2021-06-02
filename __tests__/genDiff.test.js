import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('main flow', () => {
  const filepath1 = join(__dirname, '__fixtures__', 'file1.json');
  const filepath2 = join(__dirname, '__fixtures__', 'file2.json');
  const expected = {
    '- follow': false,
    '  host': 'hexlet.io',
    '- proxy': '123.234.53.22',
    '- timeout': 50,
    '+ timeout': 20,
    '+ verbose': true,
  };

  expect(genDiff(filepath1, filepath2)).toBe(JSON.stringify(expected, null, '\t'));
});
