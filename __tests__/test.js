import path from 'path';
import fs from 'fs';
import cartesian from 'cartesian';
import genDiff from '../src';

const supportedExtensions = ['json', 'yml', 'ini'];
const outputFormats = ['Plain', 'General'];
const types = ['flat', 'nested'];

const groups = cartesian([supportedExtensions, outputFormats, types]);

test.each(groups)(
  'outputs the difference between %s %s %s',
  (extension, format, type) => {
    const firstConfig = path.resolve(__dirname, `__fixtures__/${type}/before.${extension}`);
    const secondConfig = path.resolve(__dirname, `__fixtures__/${type}/after.${extension}`);
    const fixturePath = path.resolve(__dirname, `__fixtures__/${type}/${extension}Fixture${format}.txt`);

    const expectedDiff = fs.readFileSync(fixturePath, 'utf-8');
    const actualDiff = genDiff(firstConfig, secondConfig, format.toLowerCase());

    expect(actualDiff).toBe(expectedDiff);
  },
);
