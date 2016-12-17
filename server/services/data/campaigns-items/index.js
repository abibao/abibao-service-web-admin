'use strict'

const service = require('feathers-sequelize')
const hooks = require('./hooks')

const CampaignItemModel = require('./../campaigns-items/model')

module.exports = function () {
  const app = this
  const CampaignItem = CampaignItemModel(app)
  app.use('api/campaigns-items', service({
    Model: CampaignItem,
    paginate: {
      default: 25,
      max: 50
    }
  }))
  const _service = app.service('api/campaigns-items')
  _service.before(hooks.before)
  _service.after(hooks.after)
}
