'use strict'

const Sequelize = require('sequelize')
const Cryptr = require('cryptr')

module.exports = function (app) {
  const Individual = app.sequelize.define('Individual', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
      defaultValue: Sequelize.UUIDV4
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    charity: {
      type: Sequelize.STRING,
      allowNull: false
    },
    hasRegisteredEntity: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'none'
    },
    hasRegisteredSurvey: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'none'
    },
    hasRegisteredSource: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'none'
    }
  }, {
    getterMethods: {
      urn: function () {
        const cryptr = new Cryptr(app.get('auth').secret)
        return 'abibao:database:individual:' + cryptr.encrypt(this.id)
      },
      urnCharity: function () {
        const cryptr = new Cryptr(app.get('auth').secret)
        return 'abibao:database:entity:' + cryptr.encrypt(this.charity)
      }
    },
    timestamps: true,
    paranoid: true,
    underscored: false,
    freezeTableName: true,
    tableName: 'individuals'
  })
  Individual.sync()
  return Individual
}
