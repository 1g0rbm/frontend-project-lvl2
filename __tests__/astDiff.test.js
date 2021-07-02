import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { test, expect } from '@jest/globals';
import getFileContent from './helpers/loadContent';
import buildDiffAst from '../src/astDiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFullPath = (fileName) => join(__dirname, '__fixtures__', fileName);
const getData = (fileName) => JSON.parse(getFileContent(getFullPath(fileName)));

test('makeNode test', () => {
  const first = getData('/astDiff/firstObject.json');
  const second = getData('/astDiff/secondObject.json');

  expect(buildDiffAst(first, second)).toStrictEqual(getData('/astDiff/expected.json'));
});
