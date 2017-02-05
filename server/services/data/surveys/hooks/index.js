'use strict'

const populate = require('feathers-hooks-common').populate
const serialize = require('feathers-hooks-common').serialize
const uuid = require('../../../globalHooks').uuid

const schema = {
  populate: {
    include: [{
      service: 'api/individuals',
      nameAs: 'individual',
      parentField: 'individual',
      childField: 'id'
    }, {
      service: 'api/campaigns',
      nameAs: 'campaign',
      parentField: 'campaign',
      childField: 'id'
    }, {
      service: 'api/entities',
      nameAs: 'charity',
      parentField: 'charity',
      childField: 'id'
    }, {
      service: 'api/entities',
      nameAs: 'company',
      parentField: 'company',
      childField: 'id'
    }]
  },
  serialize: {
    only: ['id', 'isAbibao', 'individual', 'urnIndividual', 'campaign', 'urnCampaign', 'charity', 'urnCharity', 'company', 'urnCompany', 'updatedAt', 'createdAt'],
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
    populate({schema: schema.populate, profile: true}),
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
