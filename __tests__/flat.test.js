import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const testedExtensions = ['json', 'yml'];

testedExtensions.forEach((extension) => {
  test(`outputs the difference between ${extension} files`, () => {
    const firstConfig = path.resolve(__dirname, `__fixtures__/before.${extension}`);
    const secondConfig = path.resolve(__dirname, `__fixtures__/after.${extension}`);
    const fixturePath = path.resolve(__dirname, `__fixtures__/${extension}Fixture.txt`);

    const expectedDiff = fs.readFileSync(fixturePath, 'utf-8');
    const actualDiff = genDiff(firstConfig, secondConfig);

    expect(actualDiff).toBe(expectedDiff);
  });
});
