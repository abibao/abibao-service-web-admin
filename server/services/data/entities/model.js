'use strict'

const Sequelize = require('sequelize')
const Cryptr = require('cryptr')

module.exports = function (app) {
  const Entity = app.sequelize.define('Entity', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    contact: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    url: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {
        isUrl: true
      }
    },
    type: {
      type: Sequelize.ENUM('none', 'abibao', 'charity', 'company'),
      allowNull: false
    },
    icon: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'images/icons/default.png'
    },
    picture: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'images/pictures/default.png'
    },
    avatar: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'images/avatars/default.png'
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    hangs: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    usages: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  }, {
    getterMethods: {
      urn: function () {
        const cryptr = new Cryptr(app.get('auth').secret)
        return 'abibao:database:entity:' + cryptr.encrypt(this.id)
      }
    },
    timestamps: true,
    paranoid: true,
    underscored: false,
    freezeTableName: true,
    tableName: 'entities'
  })
  Entity.sync()
  return Entity
}
