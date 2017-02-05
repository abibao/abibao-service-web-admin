'use strict'

const auth = require('feathers-legacy-authentication-hooks')
const uuid = require('../../../globalHooks').uuid

exports.before = {
  all: [
    auth.restrictToAuthenticated()
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
}

exports.after = {
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
