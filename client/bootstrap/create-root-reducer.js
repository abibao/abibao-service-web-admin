'use strict'

import {combineReducers} from 'redux'

import {routeReducer} from 'redux-simple-router'
// import infoReducer from '../reducers/info'
// import loginReducer from '../reducers/login'

export default function createRootReducer () {
  return combineReducers({
    routing: routeReducer
    // info: infoReducer,
    // login: loginReducer
  })
}
