/*global riot*/

import Services from './services'

const init = function (page) {
  page.connected = false
  page.loading = true

  page.socket = riot.feathers.io
  page.client = riot.feathers
  page.services = new Services(page.client)

  page.socket.on('connect', () => {
    console.log(riot.routeState.view, 'socket() connected', page.socket.id)
    page.update()
    page.client.authenticate({
    }).then((response) => {
      return page.client.passport.verifyJWT(response.accessToken)
    }).then((payload) => {
      return page.client.service('users').get(payload.userId)
    }).then((user) => {
      page.client.set('user', user)
      return true
    }).then(() => {
      page.connected = true
      page.loading = false
      page.update()
      page.services.getCampaigns()
      page.services.getCompanies()
      page.services.getCharities()
    }).catch((error) => {
      console.error(riot.routeState.view, 'client.authenticate()', error)
    })
  })

  page.socket.on('disconnect', () => {
    console.log(riot.routeState.view, 'socket() disconnect')
    page.connected = false
    page.loading = false
    page.update()
  })

  page.on('mount', () => {
    console.log(riot.routeState.view, 'mount', page.socket.id)
    if (page.socket.id) {
      page.services.getCampaigns()
      page.services.getCompanies()
      page.services.getCharities()
    }
  })

  page.on('updated', () => {
    console.log(riot.routeState.view, 'updated')
  })
}

export default init
