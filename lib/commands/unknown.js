'use strict'

module.exports = function (api, config) {
  function answerUnknown (msg, cmd) {
    var text = 'unbekannter Befehl "`' + cmd.command + '`"'

    api.sendMessage({
      chat_id: msg.chat.id,
      text: text,
      parse_mode: 'Markdown'
    }).catch((err) => {
      console.error(err.error)
    })

    api.leaveChat(msg.chat.id)
  }

  return {
    'UNKNOWN': answerUnknown
  }
}
