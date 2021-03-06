'use strict'

const Service = require('feathers-sequelize')
const hooks = require('./hooks')

const EntityModel = require('./../entities/model')

module.exports = function () {
  const app = this
  const Entity = EntityModel(app)
  app.use('/api/entities', Service({
    Model: Entity,
    paginate: app.get('paginate')
  }))
  const service = app.service('api/entities')
  service.before(hooks.before)
  service.after(hooks.after)
}
