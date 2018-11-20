'use strict'

const path = require('path')

module.exports = {
  db: 'mongodb://localhost/',
  log: path.resolve(__dirname, '../logs/board.log'),
  base: 'board',
  port: '3002',
  root: 'http://iszu.cn',
  secret: 'buzhidao'
}
