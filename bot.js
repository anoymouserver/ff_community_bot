#!/usr/bin/node
'use strict'

const path = require('path')
const BotApi = require('telegram-bot-api')
const conf = require(path.join(__dirname, 'config.json'))
const parser = require(path.join(__dirname, 'lib', 'parser.js'))

var apiOptions = {
  token: conf.token,
  updates: {
    enabled: true,
    get_interval: conf.updateInterval
  }
}
if (typeof conf.http_proxy === 'object') {
  apiOptions.http_proxy = conf.http_proxy
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

function onMessage (message) {
  console.log(message)

  var command = parser(message.text)
  console.log(command)
}
