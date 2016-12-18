'use strict'

const glob = require('glob')
const async = require('async')
const path = require('path')
const fse = require('fs-extra')
const colors = require('colors/safe')
const rp = require('request-promise')

const patternPath = path.resolve(__dirname, '../volumes/prod/rethinkdb/entities') + '/*.json'
const files = glob.sync(patternPath, {
  nodir: true,
  dot: true,
  ignore: ['index.js']
})

async.mapSeries(files, (filepath, next) => {
  const entity = fse.readJsonSync(filepath)
  let options = {
    method: 'POST',
    body: entity,
    uri: 'http://localhost:8000/api/entities',
    json: true
  }
  rp(options)
    .then(() => {
      console.log(colors.green.bold(options.body.id, 'has been created'))
      next()
    })
    .catch((error) => {
      console.log(colors.red.bold(options.body.id, error.message))
      next()
    })
}, (err, results) => {
  if (err) {
    console.log('\n', colors.bgRed.bold(' ERROR! '))
    console.log(err)
    process.exit(1)
  } else {
    console.log('\n', colors.bgGreen.bold(' DONE! '), '\n')
    process.exit(0)
  }
})