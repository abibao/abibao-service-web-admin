'use strict'

const hooks = require('feathers-hooks')
const auth = require('feathers-authentication')
const local = require('feathers-authentication-local')

exports.before = {
  all: [
    hooks.disable('external')
  ],
  find: [
    auth.hooks.authenticate('jwt')
  ],
  get: [],
  create: [
    local.hooks.hashPassword({ passwordField: 'password' })
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
