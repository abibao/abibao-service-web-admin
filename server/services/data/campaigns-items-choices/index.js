'use strict'

const Service = require('feathers-sequelize')
const hooks = require('./hooks')

const CampaignItemChoiceModel = require('./../campaigns-items-choices/model')

module.exports = function () {
  const app = this
  const CampaignItemChoice = CampaignItemChoiceModel(app)
  app.use('/api/campaigns-items-choices', Service({
    Model: CampaignItemChoice,
    paginate: app.get('paginate')
  }))
  const service = app.service('api/campaigns-items-choices')
  service.before(hooks.before)
  service.after(hooks.after)
}
