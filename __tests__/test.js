import path from 'path';
import fs from 'fs';
import cartesian from 'cartesian';
import genDiff from '../src';

const supportedExtensions = ['json', 'yml', 'ini'];
const outputFormats = ['Plain', 'General', 'JSON'];

const groups = cartesian([supportedExtensions, outputFormats]);

test.each(groups)(
  'outputs the difference between %s in %s format',
  (extension, format) => {
    const firstConfig = path.resolve(__dirname, `__fixtures__/gendiff/before.${extension}`);
    const secondConfig = path.resolve(__dirname, `__fixtures__/gendiff/after.${extension}`);
    const fixturePath = path.resolve(__dirname, `__fixtures__/gendiff/${extension}Fixture${format}.txt`);

    const expectedDiff = fs.readFileSync(fixturePath, 'utf-8');
    const actualDiff = genDiff(firstConfig, secondConfig, format.toLowerCase());

    expect(actualDiff).toBe(expectedDiff);
  },
);
