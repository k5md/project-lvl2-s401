import general from './general';
import plain from './plain';

const renderers = {
  general,
  plain,
};

export default format => renderers[format];
