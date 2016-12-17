'use strict'

const service = require('feathers-sequelize')
const hooks = require('./hooks')

const EntityModel = require('./../entities/model')

module.exports = function () {
  const app = this
  const Entity = EntityModel(app)
  app.use('api/entities', service({
    Model: Entity,
    paginate: {
      default: 25,
      max: 50
    }
  }))
  const _service = app.service('api/entities')
  _service.before(hooks.before)
  _service.after(hooks.after)
}
