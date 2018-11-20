'use strict'

const moment = require('moment')
const cheerio = require('cheerio')
const request = require('request-promise')

const {
  normalizeResponse,
  toCheerIO,
  trim,
  trimLeft,
  trimRight,
  parseURL,
  parseProxyURL
} = require('./util')

function simplify (element, root = false) {
  let result = ''

  // 遍历某个元素所有子节点，提取有用的信息并写入 result 中
  for (let el of element.children) {
    if (el.type === 'tag') {
      // br img 这两个标签是没有子节点的，在最前面单独处理
      if (el.name === 'br') {
        result += '<p>'
        continue
      } else if (el.name === 'img') {
        // 先转换为正常链接，然后转换到代理链接
        result += `<img src="${parseProxyURL(parseURL(el.attribs.src))}">`
        continue
      }

      // 递归获取所有子节点的处理后的结果，舍弃空节点
      let simplifiedChildren = simplify(el).replace(/ +/, ' ')
      if (!simplifiedChildren) continue

      // 公文通里有些元素的标签是 o: v: 开头的，会导致 cheerio 报错，所以要先把冒号替换掉
      el.name = el.name.replace(':', '-').toLowerCase()

      // 对于最外层的行内元素均当作段落处理
      // 例: 322182
      if (root && (el.name === 'span' || el.name === 'font' || el.name === 'o-p')) {
        el.name = 'p'
      }

      // 对于一些已知标签，保留其部分属性或样式，其它的全部舍弃（就是这么刚）
      switch (el.name) {
        case 'a': {
          if (el.attribs.href) result += `<a href="${parseURL(el.attribs.href)}">${simplifiedChildren}</a>`
          else result += `<a>${simplifiedChildren}</a>`
          break
        }
        case 'b':
        case 'strong': {
          result += `<strong>${simplifiedChildren}</strong>`
          break
        }
        case 'i':
        case 'em': {
          result += `<em>${simplifiedChildren}</em>`
          break
        }
        case 'u': {
          result += `<u>${simplifiedChildren}</u>`
          break
        }
        // 这三个标签将解析为普通行内文本，并且只保留颜色的样式
        case 'font':
        case 'span':
        case 'o-p': {
          const $el = toCheerIO(el)
          const color = el.attribs.color || $el.css('color') || $el.css('COLOR') || ''

          if (color && color !== 'black' && color !== '#000' && color !== '#000000') {
            result += `<span style="color:${color}">${simplifiedChildren}</span>`
          } else result += `${simplifiedChildren}`

          break
        }
        // p 标签将解析成段落，并保留文本对齐样式
        case 'p': {
          const $el = toCheerIO(el)
          let align = ($el.attr('align') || $el.css('text-align') || $el.css('TEXT-ALIGN') || '').toLowerCase()

          // 有些单位在撰写文章时在署名前面添加空格来模拟“右对齐”
          // 所以这里直接把这种情况装换为右对齐段落
          // 为了避免把全是空格的文本片段误认为是右对齐段落
          // trim 后的 el.data 必须不为空
          // 例: 322453
          // 但有的真的没办法= = 比如 322342 322189
          // const leftTrimmed = trimLeft(simplifiedChildren)
          // const content = trimRight(leftTrimmed)
          // if (content && simplifiedChildren.replace('&nbsp;', ' ').length - leftTrimmed.length > 10) {
          //   align = 'right'
          // }

          // 对段落的两侧进行 trim ，这样在以后添加 text-indent 的 CSS 样式时不会显得很奇怪
          const content = trim(simplifiedChildren)
          if (content) {
            if (align && align !== 'left') result += `<p style="text-align:${align}">${content}</p>`
            else result += `<p>${content}</p>`
          }

          break
        }
        case 'table':
        case 'tbody':
        case 'th':
        case 'tr':
        case 'td': {
          let attr = ''
          if (el.attribs.colspan) attr += ` colspan="${el.attribs.colspan}"`
          if (el.attribs.rowspan) attr += ` rowspan="${el.attribs.rowspan}"`

          result += `<${el.name}${attr}>${simplifiedChildren}</${el.name}>`
          break
        }
        default: {
          result += simplifiedChildren
          break
        }
      }
    } else {
      result += el.data
    }
  }

  return result
}

function parseContent (html) {
  const wrapper = 'board-processor-wrapper'
  const $ = cheerio.load(`<div id="${wrapper}">${html.replace(/\r\n/g, '')}</div>`, { decodeEntities: false, normalizeWhitespace: false })
  let root = $(`#${wrapper}`)[0]

  if (root.children.length === 1) {
    // 当 root 只有一个子节点时，考虑是否展开这个子节点
    const el = root.children[0]
    if (el.type === 'tag') {
      if (el.name === 'p' || el.name === 'font') {
        root = el
      }

      if (el.name === 'table') {
        // 有的页面只由一个表格组成，而且这个表格里直接就是文章（很毒）
        // 所以要展开这样的表格
        let trs = el.children.find(item => item.name === 'tbody')
        if (trs != null && trs.children.every(tr => tr.children.length === 1)) {
          const children = []
          trs.children.forEach(tr => children.splice(children.length, 0, ...tr.children[0].children))
          root = $('<div></div>').append(children)[0]
        }
      }
    }
  }

  // 简化页面
  let result = simplify(root, true)

  // 即使在 simplify 中已经尽可能避免空段落的出现，但还是不能100%消除空段落
  // 所以在最后粗暴地清掉空段落
  // TODO: 这个正则表达式需要改进
  result = result.replace(/<p( style="text-align:(right|center)")?>(<br>)?<\/p>/g, '')

  // 在 simplify 中有简单地查找用空格模拟右对齐的段落
  // 这里再查找一次这样的段落
  const reg = /<p>( ?　?(&nbsp;)?)+/g
  const matches = result.match(reg)
  if (matches != null) {
    matches.forEach(match => {
      if (match.replace(/&nbsp;/g, ' ').length > 13) {
        result = result.replace(match, '<p style="text-align:right">')
      }
    })
  }

  // 即使在 simplify 中已经尽可能避免段落的开头出现空格
  // 但还是不能100%避免这样的情况
  // 所以在最后把段落开头的空格清除
  result = result.replace(/>( ?　?(&nbsp;)?)+/g, '>')

  // 把不统一的项目符号替换为统一
  result = result.replace(/<p>(\d\d?)[.．]( ?)+/g, '<p>$1. ')

  return result
}

function parseArticle (response) {
  const html = normalizeResponse(response)

  // 匹配正文信息部分的首尾字符串
  const tableStart = html.indexOf('<table border="0" cellspacing="0" cellpadding=4 style="border-collapse: collapse" width="85%">')
  const tableEnd = html.lastIndexOf('</table>\r\n</td>\r\n </tr>\r\n</table>\r\n</td>\r\n</tr>\r\n</table>\r\n</td>\r\n</tr>')

  let $, $parent
  if (tableStart > 0 && tableEnd > 0) {
    // 不通过 cheerio 加载完整的文档来加快处理速度
    $ = cheerio.load(html.substr(tableStart, tableEnd - tableStart + 8), { decodeEntities: false, normalizeWhitespace: false })
    $parent = $('table:root')
  } else {
    // 但如果匹配失败，还是要通过 cheerio 来加载整个文档
    $ = cheerio.load(html, { decodeEntities: false, normalizeWhitespace: false })
    $parent = $('body > table > tr:nth-child(2) > td > table > tr:nth-child(3) > td > table > tr:nth-child(2) > td > table')
  }

  // 直接通过读取对应元素的文本来获取元数据
  // 内容部分则需要相应的变换处理
  const result = {
    title: $parent.find('> tr:nth-child(1)').text().trim(),
    author: $parent.find('> tr:nth-child(2)').text().trim().split('　')[0],
    date: moment($parent.find('> tr:nth-child(2)').text().trim().split('　')[1], 'Y-M-D HH:mm:ss').toDate(),
    attachments: Array.from($parent.find('> tr:nth-child(4) > td > table > tr > td:nth-child(1) a'), el => ({ name: $(el).text().trim().substr(1), href: $(el).attr('href') })),
    lastEdit: moment($parent.find('> tr:nth-child(4) > td > table > tr > td:nth-child(2)').text().trim().split('　')[0].substr(4), 'Y-M-D HH:mm:ss').toDate(),
    content: parseContent($parent.find('> tr:nth-child(3) > td').html())
  }

  if (Number.isNaN(+result.lastEdit)) {
    if (Number.isNaN(+result.date)) {
      throw new Error('Invalid Article')
    } else result.lastEdit = result.date
  }

  return result
}

module.exports = async id => {
  const response = await request(`http://www1.szu.edu.cn/board/view.asp?id=${id}`, { encoding: null })
  return parseArticle(response)
}
