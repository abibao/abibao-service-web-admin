'use strict'

const Sequelize = require('sequelize')
const Cryptr = require('cryptr')

module.exports = function (app) {
  const Campaign = app.sequelize.define('Campaign', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    company: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: ''
    },
    position: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    screenWelcomeContent: {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: ''
    },
    screenThankYouContent: {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: ''
    }
  }, {
    getterMethods: {
      urn: function () {
        const cryptr = new Cryptr(app.get('auth').secret)
        return 'abibao:database:campaign:' + cryptr.encrypt(this.id)
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
    tableName: 'campaigns'
  })
  Campaign.sync()
  return Campaign
}
