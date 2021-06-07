import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import getParser from '../src/parsers.js';
import { getFileData } from '../src/file';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('parser factory test with json', () => {
  const fileJson = join(__dirname, '__fixtures__', 'file1.json');

  const data = getFileData(fileJson);
  expect(getParser('json')(data)).toStrictEqual({
    follow: false,
    host: 'hexlet.io',
    proxy: '123.234.53.22',
    timeout: 50,
  });
});

test('parser factory test with yaml', () => {
  const file = join(__dirname, '__fixtures__', 'file1.yml');

  const data = getFileData(file);
  expect(getParser('yaml')(data)).toStrictEqual({
    follow: false,
    host: 'hexlet.io',
    proxy: '123.234.53.22',
    timeout: 50,
  });
});

test('parser factory test with undefined ext', () => {
  expect(() => getParser('invalid'))
    .toThrowError('There is no parser for file extension "invalid"');
});
