'use strict'

const board = require('./lib/board')
const Article = require('../../server/src/models/article')
const schedule = require('node-schedule')

const lectureRegex = /讲座|学术报告/

function updateListCaller () {
  updateList().then(() => console.log('update complete')).catch(err => console.error(err.stack))
}

if (process.env.NODE_ENV !== 'development') {
  schedule.scheduleJob('*/5 * * * *', updateListCaller)
} else {
  updateListCaller()
}

async function updateList () {
  // 获取列表
  const list = await board.getArticles()

  // 从上到下更新列表，遇到第一个没有更改的条目结束
  for (const item of list) {
    console.log('updating article', item.id)

    // 如果无法获取文章则跳过
    try {
      const data = await board.getArticle(item.id)
      const dbData = await Article.findById(item.id)

      if (dbData == null || data.lastEdit > dbData.lastEdit) {
        // 把 type, sticky, lecture 属性加到数据中
        Object.assign(data, item, { lecture: lectureRegex.test(data.title) })
        await Article.findByIdAndUpdate(item.id, { $set: data }, { upsert: true })
      } else if (!item.sticky) continue
    } catch (e) {
      // TODO: 增加报警
      console.error(e.stack)
    }
  }

  // 批量更新顶置状态
  const stickyItems = list.filter(item => item.sticky).map(item => item.id)

  // 设置原来顶置，现在不顶置的条目
  await Article.update({
    _id: { $nin: stickyItems },
    sticky: true
  }, { $set: { sticky: false } }, { multi: true })

  // 保证现在置顶的条目全部置顶
  await Article.update({
    _id: { $in: stickyItems },
    sticky: false
  }, { $set: { sticky: true } }, { multi: true })
}
