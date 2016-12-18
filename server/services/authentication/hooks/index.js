'use strict'

const auth = require('feathers-authentication').hooks

exports.before = {
  all: [],
  find: [],
  get: [],
  create: [
    auth.authenticate('jwt')
  ],
  update: [],
  patch: [],
  remove: []
}

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
}
