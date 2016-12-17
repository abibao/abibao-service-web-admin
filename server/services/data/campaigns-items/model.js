'use strict'

const Sequelize = require('sequelize')
const Cryptr = require('cryptr')

module.exports = function (app) {
  const CampaignItem = app.sequelize.define('CampaignItem', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false
    }
  }, {
    getterMethods: {
      urn: function () {
        const cryptr = new Cryptr(app.get('auth').token.secret)
        return 'abibao:database:campaign_item:' + cryptr.encrypt(this.id)
      }
    },
    timestamps: true,
    paranoid: true,
    underscored: false,
    freezeTableName: true,
    tableName: 'campaigns_items'
  })
  CampaignItem.sync({force: true})
  return CampaignItem
}
