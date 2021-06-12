import { test, expect } from '@jest/globals';
import buildDiffAst from '../../src/astDiff';
import plain from '../../src/formatters/plain';

test('plain formatter test', () => {
  const ast = buildDiffAst({
    a: 'AA',
    b: 'DD',
    c: {
      d: 'NN',
      e: 'EE',
    },
  },
  {
    a: 'AA',
    c: {
      e: 'NN',
      f: 'FF',
    },
    g: 'GG',
  });
  const expected = `Property 'b' was removed
Property 'c.d' was removed
Property 'c.e' was updated. From 'EE' to 'NN'
Property 'c.f' was added with value: 'FF'
Property 'g' was added with value: 'GG'`;

  expect(plain(ast)).toBe(expected);
});
