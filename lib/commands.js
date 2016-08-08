'use strict'

const path = require('path')
const _ = require('lodash')

module.exports = function (api, config) {
  var commands = {}
  var commandsPath = path.join(__dirname, 'commands')

  require('fs').readdirSync(commandsPath).forEach((e) => {
    if (/^\w+\.js$/.test(e)) {
      _.merge(commands, require(path.join(commandsPath, e))(api, config))
    }
  })

  return commands
}
