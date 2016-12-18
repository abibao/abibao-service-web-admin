'use strict'

const auth = require('feathers-authentication').hooks
const hooks = require('feathers-hooks')

const issueJWT = () => {
  return hook => {
    const app = hook.app
    const id = hook.result.id
    return app.passport.createJWT({ userId: id }, app.get('auth')).then(accessToken => {
      hook.result.accessToken = accessToken
      return Promise.resolve(hook)
    })
  }
}

exports.before = {
  all: [],
  find: [
    auth.authenticate('jwt')
  ],
  get: [],
  create: [
    hooks.disable('external')
  ],
  update: [
    hooks.disable('external')
  ],
  patch: [
    hooks.disable('external')
  ],
  remove: [
    hooks.disable('external')
  ]
}

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [
    issueJWT()
  ],
  update: [],
  patch: [],
  remove: []
}
