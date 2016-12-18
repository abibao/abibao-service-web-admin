'use strict'

const Sequelize = require('sequelize')
const serveStatic = require('feathers').static
const compress = require('compression')
const cors = require('cors')
const feathers = require('feathers')
const configuration = require('feathers-configuration')
const auth = require('feathers-authentication')
const jwt = require('feathers-authentication-jwt')
const hooks = require('feathers-hooks')
const rest = require('feathers-rest')
const bodyParser = require('body-parser')
const socketio = require('feathers-socketio')
const middlewares = require('./middlewares')
const services = require('./services')

const app = feathers()

app.configure(configuration())

app.sequelize = new Sequelize(app.get('mysql').database, app.get('mysql').username, app.get('mysql').password, {
  dialect: 'mariadb',
  host: app.get('mysql').host,
  port: app.get('mysql').port,
  logging: false
})

const whitelist = app.get('corsWhitelist')
const corsOptions = {
  origin (origin, callback) {
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1
    callback(null, originIsWhitelisted)
  }
}

app.use(compress())
  .options('*', cors(corsOptions))
  .use(cors(corsOptions))
  .use('/', serveStatic(app.get('public')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(hooks())
  .configure(rest())
  .configure(socketio())
  // Configure feathers-authentication
  .configure(auth({secret: app.get('auth').secret}))
  .configure(jwt())
  // Configure services
  .configure(services)
  .configure(middlewares)

// Create a user that we can use to log in
const newUser = {
  email: app.get('superu').email,
  password: app.get('superu').password,
  permissions: ['*']
}

app.service('users').create(newUser).then(user => {
  console.log('Created default user', user)
}).catch(console.error)

app.listen(app.get('port'), app.get('host'), () => {
})
