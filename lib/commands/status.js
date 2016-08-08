'use strict'

const path = require('path')
const _ = require('lodash')
const nodelist = require(path.join(__dirname, '..', 'nodelist'))

module.exports = function (api, config) {
  function initStatus (msg, cmd) {
    nodelist(config.nodelist, answerStatus, {msg: msg, cmd: cmd})
  }

  function answerStatus (nodelist, err, options) {
    var text = ''
    var nodes = _.get(nodelist, 'nodes', [])

    if (options.cmd.args.length >= 1) {
      let node = _.find(nodes, (e) => {
        return e.id === options.cmd.args[0] || _.startsWith(e.name, options.cmd.args[0])
      })

      let isOnline = _.get(node, 'status.online', false)
      text = '' +
        '*' + node.name + '*\n' +
        'Status: ' + (isOnline ? 'online' : 'offline') + '\n' +
        'Clients: ' + (isOnline ? _.get(node, 'status.clients', 0) : 0)
    } else {
      let clients = 0
      let online = 0

      _.forEach(nodes, (e) => {
        if (_.get(e, 'status.online', false)) {
          clients += _.get(e, 'status.clients', 0)
          online += 1
        }
      })
      text = '' +
        '*Netzwerk*\n' +
        '`' + online + '` Nodes online\n' +
        '`' + clients + '` Clients verbunden'
    }

    api.sendMessage({
      chat_id: options.msg.chat.id,
      text: text,
      parse_mode: 'Markdown'
    }).catch((err) => {
      console.error(err.error)
    })
  }

  return {
    '/status': initStatus
  }
}
