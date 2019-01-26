import general from './general';
import plain from './plain';
import json from './json';

const renderers = {
  general,
  plain,
  json,
};

export default format => renderers[format];
