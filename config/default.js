'use strict'

const path = require('path')
const nconf = require('nconf')

nconf.argv().env().file({ file: 'nconf.json' })

module.exports = {
  'host': nconf.get('ABIBAO_SERVICE_HOST') || 'localhost',
  'port': nconf.get('ABIBAO_SERVICE_PORT') || 8000,
  'superu': {
    'email': nconf.get('ABIBAO_ADMINISTRATOR_EMAIL') || 'admin@abibao.com',
    'password': nconf.get('ABIBAO_ADMINISTRATOR_PASSWORD') || 'password'
  },
  'mysql': {
    'host': nconf.get('ABIBAO_MYSQL_HOST') || 'localhost',
    'port': nconf.get('ABIBAO_MYSQL_PORT') || 3306,
    'database': nconf.get('ABIBAO_MYSQL_DATABASE') || 'abibao',
    'username': nconf.get('ABIBAO_MYSQL_USERNAME') || 'abibao',
    'password': nconf.get('ABIBAO_MYSQL_PASSWORD') || 'abibao'
  },
  'public': path.resolve(__dirname, '../dist'),
  'corsWhitelist': ['localhost'],
  'auth': {
    'secret': nconf.get('ABIBAO_API_GATEWAY_SERVER_AUTH_JWT_KEY') || 'LOCALHOST'
  }
}
