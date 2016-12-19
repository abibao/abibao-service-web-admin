import feathers from 'feathers-client'
import io from 'socket.io-client'

class FeathersClient {
  constructor () {
    const host = 'http://localhost:8000'
    let socket = io(host, { transports: ['websocket'] })
    this.feathers = feathers()
      .configure(feathers.hooks())
      .configure(feathers.socketio(socket))
      .configure(feathers.authentication({
        storage: window.localStorage,
        storageKey: 'rememberMe',
        cookieName: 'rememberMe'
      }))
  }
}

export default new FeathersClient().feathers
