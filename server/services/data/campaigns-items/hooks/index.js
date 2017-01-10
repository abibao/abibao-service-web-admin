'use strict'

const populate = require('feathers-hooks-common').populate
const serialize = require('feathers-hooks-common').serialize
const uuid = require('../../../globalHooks').uuid

const schema = {
  populate: {
    include: [{
      service: 'api/campaigns-items-choices',
      nameAs: 'choices',
      parentField: 'id',
      childField: 'item'
    }]
  },
  serialize: {
    only: ['id', 'urn', 'campaign', 'urnCampaign', 'choices', 'type', 'position', 'question', 'description', 'tags', 'label', 'placeholder', 'addCustomOption', 'addCustomOptionLabel', 'multipleSelections', 'randomize', 'required', 'maxLength', 'minimum', 'maximum', 'choices', 'updatedAt', 'createdAt'],
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
  all: [
    populate({schema: schema.populate, profile: true}),
    serialize(schema.serialize)
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
}
