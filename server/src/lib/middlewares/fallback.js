'use strict'

const fallback = require('koa-connect-history-api-fallback')

// 在前面的路由部分，如果已经有响应的内容，则不调用koa-connect-history-api-fallback
module.exports = function (options) {
  const fallbackMiddleware = fallback(options)
  return function historyApiFallbackMiddleware (ctx, next) {
    if (ctx.body === undefined && ctx.result === undefined) {
      return fallbackMiddleware(ctx, next)
    } else return next()
  }
}
