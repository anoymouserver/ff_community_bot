'use strict'

const request = require('request')

module.exports = function getNodelist (url, callback, callbackOptions) {
  request({
    url: url,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(body, null, callbackOptions)
    } else {
      callback({}, error, callbackOptions)
    }
  })
}
