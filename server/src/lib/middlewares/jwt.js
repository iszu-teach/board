'use strict'

const jwt = require('koa-jwt')
const config = require('../../config')

const noop = () => {}
const jwtMiddleware = jwt({ secret: config.secret })

/**
 * 可以直接使用的 jwt middleware
 *
 * 用法：
 * 1. 直接在路由 / Koa 中引用: `router[method](url, jwtMiddleware)`
 * 2. 只在某个 middleware 中使用: `yield jwtMiddleware(ctx)`
 */
module.exports = function (ctx, next = noop) {
  return jwtMiddleware(ctx, next)
}
