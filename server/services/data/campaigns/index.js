'use strict'

const service = require('feathers-sequelize')
const hooks = require('./hooks')

const CampaignModel = require('./../campaigns/model')

module.exports = function () {
  const app = this
  const Campaign = CampaignModel(app)
  app.use('api/campaigns', service({
    Model: Campaign,
    paginate: {
      default: 25,
      max: 50
    }
  }))
  const _service = app.service('api/campaigns')
  _service.before(hooks.before)
  _service.after(hooks.after)
}
