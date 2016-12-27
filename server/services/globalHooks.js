'use strict'

const uuid = require('uuid')

module.exports.uuid = function () {
  return function (hook) {
    hook.data.id = uuid.v4()
    console.log(hook.data)
    return hook
  }
}
