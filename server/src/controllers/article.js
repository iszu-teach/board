'use strict'

const escape = require('escape-string-regexp')
const moment = require('moment')
const Article = require('../models/article')
const { InvalidUserInputError, NotFoundError } = require('../lib/errors')

/**
 * 通过ID获取一篇文章的信息
 *
 * @param {String} id
 * @returns {Promise}
 */
exports.getOne = id => {
  return Article.findById(id)
}

/**
 * 按最后发文时间逆序获取文章列表
 *
 * @param {String} [keyword=null] 搜索关键字
 * @param {Number} [page=0] 页码（从 0 开始）
 * @param {Number} [count=20] 一页文章数
 * @returns {Promise<[]>}
 */
exports.getList = (keyword = null, category = null, start = null, end = null, page = 0, count = 20) => {
  page = Math.floor(page)
  if (Number.isNaN(page)) {
    throw new InvalidUserInputError('Page must be a number')
  }

  count = Math.floor(count)
  if (Number.isNaN(count)) {
    throw new InvalidUserInputError('Count must be a number')
  }

  const condition = {}
  if (keyword != null) {
    const search = new RegExp(keyword.split(' ').map(s => escape(s)).join('|'), 'ig')
    condition.$or = [{ title: search }, { author: search }]
  }

  if (category != null) {
    category = Math.floor(category)
    if (!Number.isNaN(category)) {
      condition.type = category
    } else throw new InvalidUserInputError('Category must be a number')

    if (category === 5) {
      condition.type = 1
      condition.lecture = true
    } else if (category === 4) {
      // 将 校园 和 生活 两个分类一并读出
      // const typeOr = [{ type: 4 }, { type: 5 }]
      // if (condition.$or) {
      //   condition.$and = [condition.$or, typeOr]
      //   delete condition.$or
      // } else {
      //   condition.$or = typeOr
      // }
      // 暴力一点的方法
      condition.type = { $gte: 4 }
    }
  }

  if (start != null) {
    start = moment(start)
    if (start.isValid()) {
      if (condition.lastEdit) condition.lastEdit.$gte = start
      else condition.lastEdit = { $gte: start }
    } else throw new InvalidUserInputError('Start must be a valid date')
  }

  if (end != null) {
    end = moment(end)
    if (end.isValid()) {
      end = end.add(1, 'days')

      if (condition.lastEdit) condition.lastEdit.$lte = end
      else condition.lastEdit = { $lte: end }
    } else throw new InvalidUserInputError('End must be a valid date')
  }

  return Article.find(condition, {
    type: true,
    sticky: true,
    lecture: true,
    title: true,
    author: true,
    lastEdit: true
  }).sort({ sticky: -1, lastEdit: -1 }).skip(page * count).limit(count)
}

exports.updateLecture = async (id) => {
  id = Math.floor(id)
  if (Number.isNaN(id)) throw new InvalidUserInputError('Article id must be a number')

  const doc = await Article.findById(id)
  if (doc === null) throw new NotFoundError()

  await Article.findByIdAndUpdate(id, { lecture: !doc.lecture })
}
