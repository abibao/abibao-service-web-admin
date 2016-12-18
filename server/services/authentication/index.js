'use strict'

const hooks = require('./hooks')

module.exports = function () {
  const app = this
  const _service = app.service('authentication')
  _service.before(hooks.before)
  _service.after(hooks.after)
}
