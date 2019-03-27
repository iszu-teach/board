'use strict'

const articleTypeTable = ['教务', '学术', '行政', '学工', '生活', '讲座']

/**
 * 查询文章类型
 *
 * @export
 * @param {Number} type 文章类型编号
 * @returns {String} 文章类型
 */
export function articleTypeLookup (type) {
  return articleTypeTable[type] || '未知'
}

function addZero (s) {
  return s.toString().padStart(2, '0')
}

/**
 * 格式化日期时间
 *
 * @export
 * @param {Date} datetime
 * @returns {String}
 */
export function formatDateTime (datetime) {
  const dt = new Date(datetime)
  if (Number.isNaN(+dt)) return datetime
  return `${dt.getFullYear()}-${addZero(dt.getMonth() + 1)}-${addZero(dt.getDate())} ${addZero(dt.getHours())}:${addZero(dt.getMinutes())}`
}

export function filterLabel (filter) {
  const result = []
  if (filter.keyword) result.push(filter.keyword)
  if (filter.category !== 'all') result.push(`分类: ${articleTypeLookup(+filter.category)}`)

  if (filter.start && !filter.end) result.push(`从${filter.start}到现在`)
  else if (!filter.start && filter.end) result.push(`${filter.end}以及之前`)
  else if (filter.start && filter.end) result.push(`${filter.start} ~ ${filter.end}`)

  return result.join(', ')
}
