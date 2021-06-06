import { test, expect } from '@jest/globals';
import { getFileExt } from "../src/file";

test('get file extension test', () => {
  expect(getFileExt('file.json')).toBe('json');

  expect(getFileExt('file.yaml')).toBe('yaml');

  expect(getFileExt('file.yml')).toBe('yaml');

  expect(getFileExt('file.test.js')).toBe('js');

  expect(getFileExt('file')).toBe('');
})
