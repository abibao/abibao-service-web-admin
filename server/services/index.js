'use strict'

const authentication = require('./authentication')
const users = require('./memory/users')
const campaigns = require('./data/campaigns')
const campaignsItems = require('./data/campaigns-items')
const campaignsItemsCoices = require('./data/campaigns-items-choices')
const entities = require('./data/entities')

module.exports = function () {
  const app = this
  app.configure(authentication)
  app.configure(users)
  app.configure(campaigns)
  app.configure(campaignsItems)
  app.configure(campaignsItemsCoices)
  app.configure(entities)
}
