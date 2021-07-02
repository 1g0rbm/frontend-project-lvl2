import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { test, expect } from '@jest/globals';
import buildDiffAst from '../../src/astDiff';
import format from '../../src/formatters/stylish.js';
import getFileContent from '../helpers/loadContent';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFullPath = (fileName) => join(__dirname, '..', '__fixtures__', fileName);
const getData = (fileName) => JSON.parse(getFileContent(getFullPath(fileName)));

test('stylish formatter test', () => {
  const first = getData('/astDiff/firstObject.json');
  const second = getData('/astDiff/secondObject.json');

  const ast = buildDiffAst(first, second);

  const expected = getFileContent(getFullPath('/formatters/stylish.txt'));

  expect(format(ast)).toBe(expected);
});
