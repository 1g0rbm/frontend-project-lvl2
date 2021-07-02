import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import buildDiffAst from '../../src/astDiff';
import plain from '../../src/formatters/plain';
import getFileContent from '../helpers/loadContent';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFullPath = (fileName) => join(__dirname, '..', '__fixtures__', fileName);
const getData = (fileName) => JSON.parse(readFileSync(getFullPath(fileName)).toString());

test('plain formatter test', () => {
  const first = getData('/astDiff/firstObject.json');
  const second = getData('/astDiff/secondObject.json');

  const ast = buildDiffAst(first, second);
  const expected = getFileContent(getFullPath('/formatters/plain.txt'));

  expect(plain(ast)).toBe(expected);
});
