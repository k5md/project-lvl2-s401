# Gendiff

[![Build Status](https://travis-ci.com/k5md/project-lvl2-s401.svg?branch=master)](https://travis-ci.com/k5md/project-lvl2-s401)
[![Maintainability](https://api.codeclimate.com/v1/badges/2148f2b145d7c8e43149/maintainability)](https://codeclimate.com/github/k5md/project-lvl2-s401/maintainability)

## What is it?

A tool that compares two config files and outputs the difference.

## Installation and usage
### Install with [npm](https://npmjs.org/):
```
$ npm install -g gendiff-s401
```
[![asciicast](https://asciinema.org/a/8s3v2CYYWukZ7GONNDav8yeGE.svg)](https://asciinema.org/a/8s3v2CYYWukZ7GONNDav8yeGE)

### Compare files:
```
$ gendiff <firstConfig> <secondConfig>
```
- JSON:
[![asciicast](https://asciinema.org/a/wcObRSLn0ceDrZaKfKqkC539g.svg)](https://asciinema.org/a/wcObRSLn0ceDrZaKfKqkC539g)
- Yaml:
[![asciicast](https://asciinema.org/a/3eIEjBAOr7JVM7iHYE0GP2iGg.svg)](https://asciinema.org/a/3eIEjBAOr7JVM7iHYE0GP2iGg)
- INI:
[![asciicast](https://asciinema.org/a/CTYsE5TjuTtPm4dwxrB9td3Ma.svg)](https://asciinema.org/a/CTYsE5TjuTtPm4dwxrB9td3Ma)

Deep structures comparison is supported:

[![asciicast](https://asciinema.org/a/2E6U33umv8DfKFTSqbBLyke3i.svg)](https://asciinema.org/a/2E6U33umv8DfKFTSqbBLyke3i)

### Format:

The tree, generated by gendiff, could be rendered in various ways. For now, general, plain and json output formats are implemented. General format is used by default. You can set the preferred renderer like this:

```
$ gendiff --format [general|plain|json] <firstConfig> <secondConfig>
```
- -f plain
[![asciicast](https://asciinema.org/a/eQ3O6hKJqUn5TGHXEY9nPnaOe.svg)](https://asciinema.org/a/eQ3O6hKJqUn5TGHXEY9nPnaOe)

- -f json
[![asciicast](https://asciinema.org/a/7c8Mh1BLAlG2iAEywXeD20Wo4.svg)](https://asciinema.org/a/7c8Mh1BLAlG2iAEywXeD20Wo4)
