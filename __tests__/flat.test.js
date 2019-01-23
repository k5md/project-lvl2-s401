import path from 'path';
import fs from 'fs';
import genDiff from '../src';

test('outputs the difference between json files', () => {
  const firstConfig = path.resolve(__dirname, '__fixtures__/before.json');
  const secondConfig = path.resolve(__dirname, '__fixtures__/after.json');
  const fixturePath = path.resolve(__dirname, '__fixtures__/flatFixture.txt');

  const expected = fs.readFileSync(fixturePath, 'utf-8');
  const actual = genDiff(firstConfig, secondConfig);

  expect(actual).toBe(expected);
});
