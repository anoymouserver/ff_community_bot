'use strict'

const path = require('path')
const _ = require('lodash')
const nodelist = require(path.join(__dirname, '..', 'nodelist'))

module.exports = function (api, config) {
  function initInfo (msg, cmd) {
    nodelist(config.nodelist, answerInfo, {msg: msg, cmd: cmd})
  }

  function answerInfo (nodelist, err, options) {
    var text = ''
    var nodes = _.get(nodelist, 'nodes', false)

    if (!err && nodes) {
      if (options.cmd.args.length >= 1) {
        let node = _.find(nodes, (e) => {
          return e.id === options.cmd.args[0] || _.startsWith(e.name, options.cmd.args[0])
        })

        let isOnline = _.get(node, 'status.online', false)
        let lastSeen = new Date(_.get(node, 'status.lastcontact'))
        let firstSeen = new Date(_.get(node, 'status.firstcontact'))
        text = '' +
          '*Name*: `' + _.get(node, 'name') + '`\n' +
          '*ID*: `' + _.get(node, 'id') + '`\n' +
          '*Status*: `' + (isOnline ? 'online' : 'offline') + '`\n' +
          '*Clients*: `' + (isOnline ? _.get(node, 'status.clients', 0) : 0) + '`\n' +
          '*LastSeen*: `' + lastSeen.toLocaleString('de-DE') + '`\n' +
          '*FirstSeen*: `' + firstSeen.toLocaleString('de-DE') + '`'
      } else {
        text = '_zu wenig Argumente, bitte NodeID oder Nodename übergeben_'
      }
    } else {
      text = '_Fehler beim Abrufen der Nodelist_'
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
    '/nodeinfo': initInfo
  }
}
