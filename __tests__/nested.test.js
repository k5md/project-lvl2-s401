import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const supportedExtensions = ['json', 'yml', 'ini'];

test.each(supportedExtensions)(
  'outputs the difference between %s files',
  (extension) => {
    const firstConfig = path.resolve(__dirname, `__fixtures__/nested/before.${extension}`);
    const secondConfig = path.resolve(__dirname, `__fixtures__/nested/after.${extension}`);
    const fixturePath = path.resolve(__dirname, `__fixtures__/nested/${extension}Fixture.txt`);

    const expectedDiff = fs.readFileSync(fixturePath, 'utf-8');
    const actualDiff = genDiff(firstConfig, secondConfig);

    expect(actualDiff).toBe(expectedDiff);
  },
);