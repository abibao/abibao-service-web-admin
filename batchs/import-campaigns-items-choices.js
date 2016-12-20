'use strict'

const glob = require('glob')
const async = require('async')
const path = require('path')
const fse = require('fs-extra')
const colors = require('colors/safe')
const rp = require('request-promise')

const patternPath = path.resolve(__dirname, '../volumes/databases/rethinkdb/campaigns_items_choices') + '/*.json'
const files = glob.sync(patternPath, {
  nodir: true,
  dot: true,
  ignore: ['index.js']
})

console.log(colors.yellow.bold('***** CAMPAIGNS ITEMS CHOICES *****'))

async.mapSeries(files, (filepath, next) => {
  const campaignItemChoice = fse.readJsonSync(filepath)
  let options = {
    method: 'POST',
    body: campaignItemChoice,
    uri: 'http://localhost:8000/api/campaigns-items-choices',
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
  }
  else {
    console.log('\n', colors.bgGreen.bold(' DONE! '), '\n')
    process.exit(0)
  }
})
