'use strict'

const extend = require('extend-shallow')
const { Liquid } = require('liquidjs')
const caller = require('caller');
const path = require('path');

const callingPath = path.dirname(caller());

const engine = new Liquid({
  root: `${callingPath}/layouts/`
})

exports.name = 'liquid'
exports.outputFormat = 'html'

// TODO: don't hardcode this here
engine.registerFilter('raise_error', e => console.log('ERROR: '+ e))

exports.renderAsync = function (str, options, locals) {
  return engine.parseAndRender(str, extend({}, options, locals))
}
