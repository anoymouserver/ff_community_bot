'use strict'

module.exports = function (api, config) {
  function answerStart (msg, cmd) {
    var text = '' +
      '*Hallo!*\n' +
      '\n' +
      'Für eine Liste der möglichen Befehle siehe /help.'

    api.sendMessage({
      chat_id: msg.chat.id,
      text: text,
      parse_mode: 'Markdown'
    }).catch((err) => {
      console.error(err.error)
    })
  }

  function answerStop (msg, cmd) {
    var text = ''

    if (msg.chat.type === 'private') {
      text = '_nur in Gruppen und Kanälen unterstützt_'
    } else {
      text = '*Tschüss!*'
    }

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
    '/start': answerStart,
    '/stop': answerStop
  }
}
