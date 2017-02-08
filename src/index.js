import React from 'react'
import { render } from 'react-dom'

import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import Feathers from './libs/Feathers'

import App from './containers/App'
import Homepage from './pages/Homepage'
import Login from './pages/Login'

import './index.css'

let requireAuth = function (nextState, replace) {
  Feathers.authenticate().then(console.log).catch(() => {
    browserHistory.push('/login')
  })
}

let requireNotAuth = (nextState, replace) => {
  Feathers.authenticate().then(() => {
    // browserHistory.push('/login')
  }).catch(() => {})
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Homepage} onEnter={requireAuth} />
      <Route path="login" component={Login} onEnter={requireNotAuth} />
    </Route>
  </Router>
), document.getElementById('root'))
