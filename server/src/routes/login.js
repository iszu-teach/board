'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')
const Router = require('koa-router')
const request = require('request-promise')
const jwtMiddleware = require('../lib//middlewares/jwt')
const { emptyResponse } = require('../lib/response')
const { ForbiddenError } = require('../lib/errors')


const router = new Router()

router.get('login', async (ctx, next) => {
  const { id, token } = ctx.query
  if (token) {
    const result = await request('https://szupu.szu.edu.cn/cas/userinfo', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      json: true,
      simple: false
    })

    if (result.data) {
      const newToken = jwt.sign({}, config.secret, { expiresIn: '7 days' })
      ctx.redirect(`https://iszu.cn/board/${id || ''}?token=${newToken}`)
    } else throw new ForbiddenError()
  } else ctx.redirect(`https://szupu.szu.edu.cn/cas/login?redirect=${encodeURIComponent(`https://iszu.cn${ctx.originalUrl}`)}`)

  return next()
})

router.post('manager/login', jwtMiddleware)
router.post('manager/login', async (ctx, next) => {
  if (!ctx.state.user.admin) throw new ForbiddenError()

  ctx.result = emptyResponse
  return next()
})

module.exports = router
