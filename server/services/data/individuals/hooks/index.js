'use strict'

const serialize = require('feathers-hooks-common').serialize
const uuid = require('../../../globalHooks').uuid

const schema = {
  serialize: {
    only: ['id', 'urn', 'charity', 'urnCharity', 'email', 'hasRegisteredEntity', 'hasRegisteredSurvey', 'hasRegisteredSource', 'updatedAt', 'createdAt'],
    exclude: ['_include', '_elapsed']
  }
}

exports.before = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
}

exports.after = {
  all: [
    serialize(schema.serialize)
  ],
  find: [],
  get: [],
  create: [
    uuid()
  ],
  update: [],
  patch: [],
  remove: []
}
