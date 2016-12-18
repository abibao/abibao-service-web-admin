'use strict'

const hooks = require('./hooks')
const memory = require('feathers-memory')

module.exports = function () {
  const app = this
  app.use('users', memory())
  const _service = app.service('users')
  _service.before(hooks.before)
  _service.after(hooks.after)
}
