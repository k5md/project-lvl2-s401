import _ from 'lodash';
import general from './general';
import plain from './plain';
import json from './json';

const renderers = {
  general,
  plain,
  json,
};

const getRenderer = (format) => {
  if (!_.has(renderers, format)) {
    throw new Error('unsupported output format');
  }
  return renderers[format];
};

export default getRenderer;
