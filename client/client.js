'use strict'

import feathers from 'feathers/client'
import socketio from 'feathers-socketio/client'
import hooks from 'feathers-hooks'
import auth from 'feathers-authentication-client'
import io from 'socket.io-client'

const host = 'http://localhost:8000'
const socket = io(host)
const client = feathers()

client
  .configure(hooks())
  .configure(socketio(socket))
  .configure(auth({
    storage: window.localStorage,
    storageKey: 'rememberMe',
    cookie: 'rememberMe'
  }))

export default client
