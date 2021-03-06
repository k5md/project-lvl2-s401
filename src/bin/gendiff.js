#!/usr/bin/env node

import program from 'commander';
import { version } from '../../package.json';
import genDiff from '..';

program
  .version(version)
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows the difference.')
  .option('-f, --format [type]', 'output format [general|plain|json]')
  .action((firstConfig, secondConfig) => {
    const formatType = program.format || 'general';
    const diff = genDiff(firstConfig, secondConfig, formatType);
    console.log(diff);
  })
  .parse(process.argv);
