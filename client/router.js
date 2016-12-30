/*global riot*/

import 'riot-routehandler'
// import List from 'list.js'
import Feathers from './feathers'

// components
import './components/menu.tag'
// pages
// import './pages/login.tag'
import './pages/dashboard.tag'
import './pages/campaigns.tag'
// import './pages/campaign-editor.tag'

var logger = (ctx, next, page) => {
  console.log(ctx.canonicalPath)
  next()
}

/* const routes = [
  {route: '*', use: logger},
  {route: '/campaigns', tag: 'campaigns'},
  {route: '/campaigns/:id', tag: 'campaign-editor'},
  {route: '/dashboard', tag: 'dashboard'},
  {route: '/login', tag: 'login'}
] */

const routes = [
  {route: '*', use: logger},
  {route: '/dashboard', tag: 'dashboard'},
  {route: '/campaigns', tag: 'campaigns'}
]

riot.feathers = new Feathers()
riot.mount('routehandler', {routes, options: {hashbang: false}})
