/*global riot*/

import Services from './services'

const init = function (page, name) {
  page.connected = false

  page.socket = riot.feathers.io
  page.client = riot.feathers
  page.services = new Services(page.client)

  page.on('mount', () => {
    if (!page.opts.page) {
      return false
    }
    console.log(name, 'mount', page.socket.id)
    if (page.socket.id) {
      page.connected = true
      page.update()
      page.trigger('control-authenticate')
      return false
    }
    page.socket.on('connect', () => {
      console.log(name, 'socket is connected', page.socket.id)
      page.connected = true
      page.update()
      page.trigger('control-authenticate')
    })
    page.socket.on('disconnect', () => {
      console.log(name, 'socket is disconnect')
      page.connected = false
      page.update()
    })
  })

  page.on('control-authenticate', () => {
    page.client.authenticate({
    }).then((response) => {
      return page.client.passport.verifyJWT(response.accessToken)
    }).then((payload) => {
      return page.client.service('users').get(payload.userId)
    }).then((user) => {
      page.client.set('user', user)
      return true
    }).then(() => {
      console.log(name, 'client is authenticated')
      if (name === 'login') {
        return page.opts.page.redirect('/dashboard')
      }
      page.connected = true
      page.update()
      page.services.initialize()
    }).catch((error) => {
      console.error(name, 'client is not authenticated', error)
      if (name !== 'login') {
        return page.opts.page.redirect('/login')
      } else {
        page.connected = true
        page.update()
      }
    })
  })
}

export default init
