import React from 'react'
import { render } from 'react-dom'

import {Router, Route, browserHistory} from 'react-router'

import App from './containers/App'
import Login from './pages/Login'

import './index.css'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="login" component={Login} />
    </Route>
  </Router>
), document.getElementById('root'))
