'use strict'

const Route = require('koa-router')
const request = require('request')
const jwt = require('jsonwebtoken')
const jwtMiddleware = require('../lib/middlewares/jwt')
const config = require('../config')
const { ForbiddenError } = require('../lib/errors')

const router = new Route()

const baseURL = 'http://www1.szu.edu.cn/board/uploadfiles/'
const imgExtends = [
  /.png$/,
  /.jpe?g$/,
  /.bmp$/,
  /.gif$/
]

router.get('file/:filename', (ctx, next) => {
  const { filename } = ctx.params
  // 仅给图片类型文件提供代理
  for (const ext of imgExtends) {
    if (ext.test(filename)) {
      ctx.body = request(baseURL + filename)
      return next()
    }
  }
  return next()
})

module.exports = router