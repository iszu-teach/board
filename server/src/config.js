'use strict'

const path = require('path')

module.exports = {
  db: 'mongodb://127.0.0.1:27017/',
  log: path.resolve(__dirname, '../../logs/board.log'),
  base: 'board',
  port: '3002',
  root: 'http://iszu.cn',
  secret: ''
}
