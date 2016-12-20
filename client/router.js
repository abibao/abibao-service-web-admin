/*global riot*/

// pages
import './pages/login.tag'
import './pages/dashboard.tag'

// libs
import client from './client'
import route from 'riot-route'

// we need to have feathers in riot
riot.feathers = client

// we need this to easily check the current route from every component
riot.route = route
riot.route.base('#')
riot.routeState = {
  view: ''
}

class Router {

  constructor () {
    // views initialize
    this._views = ['login', 'dashboard']
    this._defaultView = 'dashboard'
    this._currentView = false
    // router initialize
    riot.route(this._handleRoute.bind(this))
    riot.route.exec(this._handleRoute.bind(this))
  }

  _handleRoute (view) {
    if (this._views.indexOf(view) === -1) {
      return riot.route(this._defaultView)
    }
    else {
      return this._loadView(view)
    }
  }

  _loadView (view) {
    const opts = {
    }
    if (this._currentView) {
      this._currentView.unmount(true)
    }
    riot.routeState.view = view
    this._currentView = riot.mount('#view', view, opts)[0]
  }

}

export default new Router()
