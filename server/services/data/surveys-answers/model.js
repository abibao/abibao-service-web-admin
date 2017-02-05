'use strict'

const Sequelize = require('sequelize')
const Cryptr = require('cryptr')

module.exports = function (app) {
  const SurveyAnswer = app.sequelize.define('SurveyAnswer', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
      defaultValue: Sequelize.UUIDV4
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    charity: {
      type: Sequelize.STRING,
      allowNull: false
    },
    charityName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    campaign: {
      type: Sequelize.STRING,
      allowNull: false
    },
    campaignName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    question: {
      type: Sequelize.STRING,
      allowNull: false
    },
    answer: {
      type: Sequelize.STRING,
      allowNull: false
    },
    answerText: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    getterMethods: {
      urn: function () {
        const cryptr = new Cryptr(app.get('auth').secret)
        return 'abibao:database:survey_answer:' + cryptr.encrypt(this.id)
      }
    },
    timestamps: true,
    paranoid: true,
    underscored: false,
    freezeTableName: true,
    tableName: 'surveys_answers'
  })
  SurveyAnswer.sync()
  return SurveyAnswer
}
