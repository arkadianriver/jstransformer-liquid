'use strict'

const extend = require('extend-shallow')
const { Liquid } = require('liquidjs')
const path = require('path');

const referencingPath = Object.values(require.cache)[0].children[0].path;

const engine = new Liquid({
  root: [`${referencingPath}/layouts/`, `${process.cwd()}/layouts/`]
})

exports.name = 'liquid'
exports.outputFormat = 'html'

// TODO: don't hardcode this here
engine.registerFilter('raise_error', e => console.log('ERROR: '+ e))

exports.renderAsync = function (str, options, locals) {
  return engine.parseAndRender(str, extend({}, options, locals))
}
