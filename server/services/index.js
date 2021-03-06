'use strict'

const authentication = require('./authentication')
const users = require('./memory/users')
const individuals = require('./data/individuals')
const campaigns = require('./data/campaigns')
const campaignsItems = require('./data/campaigns-items')
const campaignsItemsCoices = require('./data/campaigns-items-choices')
const entities = require('./data/entities')
const surveys = require('./data/surveys')
const surveysAnswers = require('./data/surveys-answers')

module.exports = function () {
  const app = this
  app.configure(authentication)
  app.configure(users)
  app.configure(individuals)
  app.configure(campaigns)
  app.configure(campaignsItems)
  app.configure(campaignsItemsCoices)
  app.configure(entities)
  app.configure(surveys)
  app.configure(surveysAnswers)
}
