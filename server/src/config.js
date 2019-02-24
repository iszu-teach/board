'use strict'

const path = require('path')

module.exports = {
  db: 'mongodb://szuwechat:szu0408@localhost:28018/',
  log: path.resolve(__dirname, '../../../logs/board.log'),
  base: 'board',
  port: '3002',
  root: 'http://szuwechat.cn',
  secret: 'szu0408'
}
