#!/usr/bin/node
'use strict'

const path = require('path')
const _ = require('lodash')
const BotApi = require('telegram-bot-api')
const conf = require(path.join(__dirname, 'config.json'))
const parser = require(path.join(__dirname, 'lib', 'parser'))

var apiOptions = {
  token: conf.general.token,
  updates: {
    enabled: true,
    get_interval: conf.general.updateInterval
  }
}
if (typeof conf.general.http_proxy === 'object') {
  apiOptions.http_proxy = conf.general.http_proxy
}
var api = new BotApi(apiOptions)

var BotData = {}

api.getMe((err, data) => {
  if (err) {
    console.error(err.error)
    process.exit(1)
  }

  BotData = data
  api.on('message', (message) => {
    onMessage(message)
  })
})

var commands = require(path.join(__dirname, 'lib', 'commands'))(api, conf.commands)

function onMessage (message) {
  var commandData = parser(message.text)

  if (commandData.user === BotData.username || !commandData.user) {
    console.log(commandData)
    if (_.has(commands, commandData.command)) {
      commands[commandData.command](message, commandData)
    } else {
      commands['UNKNOWN'](message, commandData)
      console.error('unknown command >', commandData.command, '<')
    }
  }
}
