'use strict'

const Router = require('koa-router')
const jwtMiddleware = require('../lib/middlewares/jwt')
const ArticleController = require('../controllers/article')
const { emptyResponse } = require('../lib/response')
const { ForbiddenError } = require('../lib/errors')

const router = new Router()

// jwt 验证
// router.use('article*', require('../lib/middlewares/jwt'))

router.get('article/:id', async (ctx, next) => {
  ctx.result = await ArticleController.getOne(ctx.params.id)
  return next()
})

router.get('articles', async (ctx, next) => {
  let { keyword, category, start, end, page } = ctx.query

  ctx.result = await ArticleController.getList(keyword, category, start, end, page)
  return next()
})

router.post('article/:id', jwtMiddleware)
router.post('article/:id', async (ctx, next) => {
  if (!ctx.state.user.admin) throw new ForbiddenError()

  await ArticleController.updateLecture(ctx.params.id)
  ctx.result = emptyResponse
  return next()
})

module.exports = router
