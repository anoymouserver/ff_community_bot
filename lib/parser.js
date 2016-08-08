'use strict'

const _ = require('lodash')

/**
 * parses a telegram message
 *    /<command>[@<username>] [arguments]
 *    @<username> /<command> [arguments]
 *
 * @param {String} message  Telegram chat message text
 * @returns {Object} returns command information if any
 */
module.exports = function parseMessage (message) {
  var cmdData = {
    message: message,
    user: null,
    command: null,
    args: []
  }
  var prefix = message.match(/^((?:@\w+ +)?\/\w+|).*/)
  var usr
  var cmd
  switch (true) {
    case _.startsWith(prefix[1], '@'):
      usr = /^@(\w+).*/.exec(message)
      cmdData.user = usr[1]
      message = _.replace(message, /^@\w+ +/, '')
      /* falls through */

    case _.startsWith(prefix[1], '/'):
      cmd = /^(\/\w+).*/.exec(message)
      cmdData.command = cmd[1]

      usr = /^\/\w+(@\w+|).*/.exec(message)
      if (!cmdData.user && usr[1] !== '') {
        cmdData.user = usr[1].slice(1)
      }
      message = _.replace(message, /\b@\w+/, '')

      let args = /^\/\w+(?: (.*)|)/.exec(message)
      cmdData.args = (args[1] ? _.split(args[1], ' ') : [])
      cmdData.args = _.forEach(cmdData.args, (v, i, a) => {
        if (!isNaN(v)) {
          a[i] = _.toNumber(v)
        }
      })
      break

    default:
      break
  }

  return cmdData
}
