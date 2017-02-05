'use strict'

const Sequelize = require('sequelize')
const Cryptr = require('cryptr')

module.exports = function (app) {
  const Survey = app.sequelize.define('Survey', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
      defaultValue: Sequelize.UUIDV4
    },
    isAbibao: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    individual: {
      type: Sequelize.STRING,
      allowNull: false
    },
    campaign: {
      type: Sequelize.STRING,
      allowNull: false
    },
    charity: {
      type: Sequelize.STRING,
      allowNull: false
    },
    company: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    getterMethods: {
      urn: function () {
        const cryptr = new Cryptr(app.get('auth').secret)
        return 'abibao:database:survey:' + cryptr.encrypt(this.id)
      },
      urnIndividual: function () {
        const cryptr = new Cryptr(app.get('auth').secret)
        return 'abibao:database:individual:' + cryptr.encrypt(this.individual)
      },
      urnCampaign: function () {
        const cryptr = new Cryptr(app.get('auth').secret)
        return 'abibao:database:campaign:' + cryptr.encrypt(this.campaign)
      },
      urnCharity: function () {
        const cryptr = new Cryptr(app.get('auth').secret)
        return 'abibao:database:entity:' + cryptr.encrypt(this.charity)
      },
      urnCompany: function () {
        const cryptr = new Cryptr(app.get('auth').secret)
        return 'abibao:database:company:' + cryptr.encrypt(this.company)
      }
    },
    timestamps: true,
    paranoid: true,
    underscored: false,
    freezeTableName: true,
    tableName: 'surveys'
  })
  Survey.sync()
  return Survey
}
