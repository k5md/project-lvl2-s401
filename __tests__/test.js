import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import genDiff from '../src';

const supportedExtensions = ['json', 'yml', 'ini'];
const types = ['flat', 'nested'];
const pairs = _.flatten(supportedExtensions.map(extension => types.map(type => [extension, type])));

test.each(pairs)(
  'outputs the difference between %s %s',
  (extension, type) => {
    const firstConfig = path.resolve(__dirname, `__fixtures__/${type}/before.${extension}`);
    const secondConfig = path.resolve(__dirname, `__fixtures__/${type}/after.${extension}`);
    const fixturePath = path.resolve(__dirname, `__fixtures__/${type}/${extension}Fixture.txt`);

    const expectedDiff = fs.readFileSync(fixturePath, 'utf-8');
    const actualDiff = genDiff(firstConfig, secondConfig);

    expect(actualDiff).toBe(expectedDiff);
  },
);
