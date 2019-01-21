#!/usr/bin/env node

import program from 'commander';
import { version } from '../../package.json';
import genDiff from '..';

program
  .version(version)
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows the difference.')
  .option('-f, --format [type]', 'output format')
  .action((firstConfig, secondConfig) => {
    const formatType = program.format;
    genDiff({ firstConfig, secondConfig, formatType });
  })
  .parse(process.argv);
