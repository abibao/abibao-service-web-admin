/*global riot*/

import feathers from 'feathers/client'
import socketio from 'feathers-socketio/client'
import hooks from 'feathers-hooks'
import auth from 'feathers-authentication-client'
import io from 'socket.io-client'

class Client {
  constructor () {
    riot.observable(this)
    this.id = 'feathers::client::' + new Date().getTime()
    console.log(this.id, 'constructor')
    const host = 'http://localhost:8000'
    const socket = io(host)
    this._instance = feathers()
      .configure(hooks())
      .configure(socketio(socket))
      .configure(auth({
        storage: window.localStorage,
        storageKey: 'rememberMe',
        cookie: 'rememberMe'
      }))
    this._instance.io.on('connect', () => {
      console.log(this.id, 'is connected')
      this.trigger('client-connected')
    })
    this._instance.io.on('disconnect', () => {
      console.log(this.id, 'is disconnected')
      this.trigger('client-disconnected')
    })
  }
}

export default Client
