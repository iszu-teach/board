'use strict'

const iconv = require('iconv-lite')
const cheerio = require('cheerio')

function normalizeResponse (response) {
  // 从公文通得到请求响应之后，要对它进行格式上的处理，去除没用的部分
  return iconv.decode(response, 'gbk').replace(/<!--[^]*?-->/g, '').replace(/<\?xml:namespace[^]*?\/>/g, '')
}

function toCheerIO (el) {
  const $ = cheerio
  const $root = $('<div></div>').append($(el).clone())
  return $root.find(`> ${el.name}`)
}

function trimLeft (str) {
  str = str.trim()
  while (str.indexOf('&nbsp;') === 0) {
    str = str.replace(/^(&nbsp;)+/, '').trim()
  }

  return str
}

function trimRight (str) {
  str = str.trim()
  while (str.length >= 6 && str.lastIndexOf('&nbsp;') === str.length - 6) {
    str = str.replace(/(&nbsp;)+$/, '').trim()
  }

  return str
}

function trim (str) {
  return trimLeft(trimRight(str))
}

function parseURL (url) {
  if (url) {
    if (url.startsWith('http') || url.startsWith('mailto')) return url
    else if (url.startsWith('/')) return `http://www1.szu.edu.cn${url}`
    else return `http://www1.szu.edu.cn/board/${url}`
  } else return ''
}

function parseProxyURL (url) {
  if (url) {
    if (url.startsWith('http://www1.szu.edu.cn/board/uploadfiles/')) return 'https://iszu.cn/board/api/file/' + url.split('/')[url.split('/').length - 1]
    else return url
  }
}

module.exports = {
  normalizeResponse,
  toCheerIO,
  trimLeft,
  trimRight,
  trim,
  parseURL,
  parseProxyURL
}
