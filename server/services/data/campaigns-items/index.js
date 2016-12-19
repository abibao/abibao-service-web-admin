'use strict'

const Service = require('feathers-sequelize')
const hooks = require('./hooks')

const CampaignItemModel = require('./../campaigns-items/model')

module.exports = function () {
  const app = this
  const CampaignItem = CampaignItemModel(app)
  app.use('/api/campaigns-items', Service({
    Model: CampaignItem,
    paginate: {
      default: 25,
      max: 50
    }
  }))
  const service = app.service('api/campaigns-items')
  service.before(hooks.before)
  service.after(hooks.after)
}
