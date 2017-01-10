'use strict'

const glob = require('glob')
const async = require('async')
const path = require('path')
const fse = require('fs-extra')
const colors = require('colors/safe')
const ProgressBar = require('progress')

const config = require('./../config/default')

const feathers = require('feathers/client')
const socketio = require('feathers-socketio/client')
const hooks = require('feathers-hooks')
const auth = require('feathers-authentication-client')
const io = require('socket.io-client')

const host = 'http://localhost:8000'
const socket = io(host)

const client = feathers()
  .configure(hooks())
  .configure(socketio(socket))
  .configure(auth())

client.io.on('connect', () => {
  console.log(colors.green.bold('client-batch is connected'))
  // const tables = ['entities', 'campaigns', 'campaigns-items', 'campaigns-items-choices', 'surveys']
  const tables = ['entities', 'campaigns', 'campaigns-items', 'campaigns-items-choices']
  console.log(colors.yellow.bold('client-batch try to login'))
  client.authenticate({
    strategy: 'local',
    email: config.superu.email,
    password: config.superu.password
  }).then((response) => {
    return client.passport.verifyJWT(response.accessToken)
  }).then((payload) => {
    return client.service('users').get(payload.userId)
  }).then((user) => {
    client.set('user', user)
    console.log(colors.green.bold('client-batch is authorized with email', user.email))
    async.mapSeries(tables, (table, next) => {
      batch(table, next)
    }, (error, results) => {
      if (error) {
        throw new Error(error)
      } else {
        console.log(colors.green.bold('all done'))
      }
    })
  }).catch((error) => {
    console.log(colors.red.bold('an error occured'))
    console.error(error)
    process.exit(-1)
  })
})
client.io.on('disconnect', () => {
  console.log(colors.red.bold('client-batch is disconnected'))
})

const batch = (table, callback) => {
  const patternPath = path.resolve(__dirname, '../../api-gateway/src/tools/.cache/prod/rethinkdb', table.replace(/-/gi, '_'), '*.json')
  const files = glob.sync(patternPath, {
    nodir: true,
    dot: true,
    ignore: ['index.js']
  })
  var bar = new ProgressBar('    progress [:bar] :percent :etas', {
    complete: '=',
    incomplete: ' ',
    width: 30,
    total: files.length
  })
  console.log(colors.yellow.bold('... batch for', table, 'with', files.length, 'elements'))
  async.mapSeries(files, (filepath, next) => {
    let data = fse.readJsonSync(filepath)
    // try to insert
    client.service('api/' + table).create(data)
      .then(() => {
        bar.tick()
        next()
      })
      .catch(() => {
        // if error then we try to update
        return client.service('api/' + table).update(data.id, data)
          .then(() => {
            bar.tick()
            next()
          })
      })
      .catch((error) => {
        console.log('')
        console.log(colors.red.bold('an error occured'))
        console.error(error)
        process.exit(-1)
      })
  }, () => {
    callback()
  })

  /*
  async.mapSeries(files, (filepath, next) => {
    const data = fse.readJsonSync(filepath)
    let promises = []
    // hooks before
    if (tableName === 'campaigns') {
      data.EntityId = data.company
    }
    if (tableName === 'campaigns-items') {
      data.CampaignId = data.campaign
    }
    if (tableName === 'campaigns-items-choices') {
      data.CampaignId = data.campaign
      data.CampaignItemId = data.item
    }
    // insert into
    promises.push(rp({
      method: 'POST',
      headers: {
        'Authorization': token
      },
      body: data,
      uri: 'http://localhost:8000/v2/' + tableName,
      json: true
    }))
    // hooks after
    if (tableName === 'surveys') {
      _.map(Object.keys(data.answers), (question) => {
        if (_.isArray(data.answers[question])) {
          _.map(data.answers[question], (answer) => {
            let _data = {
              survey: data.id,
              question,
              answer
            }
            promises.push(rp({
              method: 'POST',
              headers: {
                'Authorization': token
              },
              body: _data,
              uri: 'http://localhost:8000/v2/surveys-answers',
              json: true
            }))
          })
        } else {
          let _data = {
            survey: data.id,
            question,
            answer: data.answers[question]
          }
          promises.push(rp({
            method: 'POST',
            headers: {
              'Authorization': token
            },
            body: _data,
            uri: 'http://localhost:8000/v2/surveys-answers',
            json: true
          }))
        }
      })
    }
    Promise.all(promises)
      .then(() => {
        bar.tick()
        next()
      })
      .catch((error) => {
        bar.tick()
        console.log('\n', error.message)
        console.log(error.options.body)
        next(error)
      })
  }, (err, results) => {
    if (err) {
      console.log('\n', colors.bgRed.bold(' ERROR! '), '\n')
      callback(err)
    } else {
      console.log('\n', colors.bgGreen.bold(' DONE! '), '\n')
      callback()
    }
  })
  */
}
