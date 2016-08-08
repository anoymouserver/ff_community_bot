'use strict'

module.exports = function (api, config) {
  function answerAbout (msg, cmd) {
    var text = '' +
      '*Freifunk-Community Telegram Bot*\n' +
      '\n' +
      '(c) by anoymouserver\n' +
      'weitere Infos: [README](https://github.com/anoymouserver/ff_community_bot#readme)'

    api.sendMessage({
      chat_id: msg.chat.id,
      text: text,
      parse_mode: 'Markdown'
    }).catch((err) => {
      console.error(err.error)
    })
  }

  return {
    '/about': answerAbout
  }
}
