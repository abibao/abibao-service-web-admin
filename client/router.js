/*global riot*/

// pages
import './pages/login.tag'

// libs
import route from 'riot-route'

route.base('/')

riot.route = route
riot.routeState = {
  view: ''
}

class Router {

  constructor () {
    // views initialize
    this._views = ['login', 'dashboard']
    this._defaultView = 'login'
    // router initialize
    riot.route(this._handleRoute.bind(this))
    riot.route.exec(this._handleRoute.bind(this))
  }

  _handleRoute (view) {
    if (this._views.indexOf(view) === -1) {
      return riot.route(this._defaultView)
    }
    this._loadView(view)
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
