/*global riot*/
'use strict'

import 'riot-routehandler'

// components
import './components/menu.tag'
// pages
import './pages/login.tag'
import './pages/dashboard.tag'
import './pages/campaigns.tag'
import './pages/campaign-editor.tag'

// feathers + socket.io
import client from './client'
riot.feathers = client

var logger = (ctx, next, page) => {
  console.log(ctx.canonicalPath)
  next()
}

const routes = [
  {route: '*', use: logger},
  {route: '/campaigns', tag: 'campaigns'},
  {route: '/campaigns/:id?', tag: 'campaign-editor'},
  {route: '/dashboard', tag: 'dashboard'},
  {route: '/login', tag: 'login'}
]

riot.mount('routehandler', {routes: routes, options: {hashbang: false}})
