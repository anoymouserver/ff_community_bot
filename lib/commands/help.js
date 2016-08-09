'use strict'

module.exports = function (api, config) {
  function answerHelp (msg, cmd) {
    var text = '' +
      '*Liste der möglichen Befehle*\n' +
      '\n' +
      '/about - Infos zum Bot\n' +
      '/status - Status des Netz oder eines Nodes\n' +
      '/nodeinfo - Infos über einen Node\n' +
      '/stop - verlassen des Chats (nur Gruppen und Kanäle)\n' +
      '/help - diese Hilfe anzeigen'

    api.sendMessage({
      chat_id: msg.chat.id,
      text: text,
      parse_mode: 'Markdown'
    }).catch((err) => {
      console.error(err.error)
    })
  }

  return {
    '/help': answerHelp
  }
}
