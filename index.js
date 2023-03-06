'use strict'

const extend = require('extend-shallow')
const { Liquid } = require('liquidjs');
//const { isObject, isArray } = require('liquidjs/dist/util/underscore');
const path = require('path');

const referencingPath = Object.values(require.cache)[0].children[0].path;

exports.name = 'liquid'
exports.outputFormat = 'html'

exports.renderAsync = async function (str, options, locals) {
  const defaultRoot = `${referencingPath}/layouts/`;
  const isOptionsObject = options !== null && !Array.isArray(options) && typeof options === "object";
  if (isOptionsObject) {
    if (options.root) {
      if (Array.isArray(options.root)) {
        options.root.push(defaultRoot);
      } else {
        options.root = [ defaultRoot, options.root ];
      }
    } else {
      options.root = defaultRoot;
    }
  } else {
    options = { root: defaultRoot };
  }

  const engine = new Liquid(options);
  
  // TODO: don't hardcode this here
  engine.registerFilter('raise_error', e => console.log('ERROR: '+ e));

  try {
    return await engine.parseAndRender(str, extend({}, options, locals));
  } catch (err) {
    console.log({
      ERROR: {
        message: "Cannot render file.",
        filename: locals.fname,
        context: err.context
      }
    });
    throw err;
  }
}
