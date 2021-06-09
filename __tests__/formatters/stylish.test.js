import { test, expect } from '@jest/globals';
import buildDiffAst from '../../src/astDiff';
import format from '../../src/formatters/stylish.js';

test('stylish formatter test', () => {
  const ast = buildDiffAst({
    a: 'AA',
    b: 'BB',
    c: {
      d: 'DD',
      e: 'EE',
    },
  },
  {
    a: 'AA',
    c: {
      e: 'DD',
      f: 'FF',
    },
    g: 'GG',
  });

  const expected = `{
      a: AA
    - b: BB
    + c: {
       - d: DD
       - e: EE
       + e: DD
       + f: FF
    }
    + g: GG
}`;

  expect(format(ast)).toBe(expected);
});
