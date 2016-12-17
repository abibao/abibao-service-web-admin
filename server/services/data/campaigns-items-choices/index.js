'use strict'

const service = require('feathers-sequelize')
const hooks = require('./hooks')

const CampaignItemChoiceModel = require('./../campaigns-items-choices/model')

module.exports = function () {
  const app = this
  const CampaignItemChoice = CampaignItemChoiceModel(app)
  app.use('api/campaigns-items-choices', service({
    Model: CampaignItemChoice,
    paginate: {
      default: 25,
      max: 50
    }
  }))
  const _service = app.service('api/campaigns-items-choices')
  _service.before(hooks.before)
  _service.after(hooks.after)
}
