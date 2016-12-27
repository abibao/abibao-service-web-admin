'use strict'

const populate = require('feathers-hooks-common').populate
const serialize = require('feathers-hooks-common').serialize
const uuid = require('../../../globalHooks').uuid

const schema = {
  populate: {
    include: [{
      service: 'api/entities',
      nameAs: 'company',
      parentField: 'company',
      childField: 'id'
    }]
  },
  serialize: {
    only: ['id', 'urn', 'company', 'name', 'description', 'position', 'screenWelcomeContent', 'screenThankYouContent', 'updatedAt', 'createdAt'],
    exclude: ['_include', '_elapsed']
  }
}

exports.before = {
  all: [],
  find: [],
  get: [],
  create: [
    uuid()
  ],
  update: [],
  patch: [],
  remove: []
}

exports.after = {
  all: [],
  find: [
    populate({schema: schema.populate, profile: true}),
    serialize(schema.serialize)
  ],
  get: [
    populate({schema: schema.populate, profile: true}),
    serialize(schema.serialize)
  ],
  create: [],
  update: [],
  patch: [],
  remove: []
}
