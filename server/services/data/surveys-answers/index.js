'use strict'

const Service = require('feathers-sequelize')
const hooks = require('./hooks')

const SurveyAnswerModel = require('./../surveys-answers/model')

module.exports = function () {
  const app = this
  const SurveyAnswer = SurveyAnswerModel(app)
  app.use('/api/surveys-answers', Service({
    Model: SurveyAnswer,
    paginate: app.get('paginate')
  }))
  const service = app.service('api/surveys-answers')
  service.before(hooks.before)
  service.after(hooks.after)
}
