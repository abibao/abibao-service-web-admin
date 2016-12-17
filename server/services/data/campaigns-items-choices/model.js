'use strict'

const Sequelize = require('sequelize')
const Cryptr = require('cryptr')

module.exports = function (app) {
  const CampaignItemChoice = app.sequelize.define('CampaignItemChoice', {
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
        return 'abibao:database:campaign_item_choice:' + cryptr.encrypt(this.id)
      }
    },
    timestamps: true,
    paranoid: true,
    underscored: false,
    freezeTableName: true,
    tableName: 'campaigns_items_choices'
  })
  CampaignItemChoice.sync({force: true})
  return CampaignItemChoice
}
