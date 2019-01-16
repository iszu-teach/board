'use strict'

const cheerio = require('cheerio')
const request = require('request-promise')
const { normalizeResponse } = require('./util')

const articleTypeTable = {
  '教务': 0,
  '学术': 1,
  '行政': 2,
  '学工': 3,
  '校园': 4,
  '生活': 5
}

function parseList (response) {
  const html = normalizeResponse(response)

  // 匹配正文信息部分的首尾字符串
  const tableStart = html.indexOf('<table border="0" cellpadding=3 style="border-collapse: collapse" width="98%"> ')
  const tableEnd = html.lastIndexOf('</table>\r\n</td>\r\n </tr>\r\n\r\n  <tr>')

  let $, $parent
  if (tableStart > 0 && tableEnd > 0) {
    // 不通过 cheerio 加载完整的文档来加快处理速度
    $ = cheerio.load(html.substr(tableStart, tableEnd - tableStart + 8), { decodeEntities: false })
    $parent = $('table:root')
  } else {
    // 但如果匹配失败，还是要通过 cheerio 来加载整个文档
    $ = cheerio.load(html, { decodeEntities: false })
    $parent = $('body > table > tr:nth-child(2) > td > table > tr:nth-child(3) > td > table > tr:nth-child(3) > td > table')
  }

  // 删除最前面两行数据
  $parent.find('> tr:nth-child(1), > tr:nth-child(2)').remove()

  let articles = []
  $parent.find('> tr').each((i, el) => {
    articles.push({
      id: $(el).find('> td:nth-child(4) a').attr('href').substr(12),
      type: articleTypeTable[$(el).find('> td:nth-child(2)').text().trim()],
      sticky: !!$(el).find('> td:nth-child(4) > font').text()
    })
  })

  return articles
}

module.exports = async () => {
  const response = await request('http://www1.szu.edu.cn/board', { encoding: null })
  return parseList(response)
}
