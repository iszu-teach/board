'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'
import { pageView } from 'scripts/ga'

Vue.use(VueRouter)

/**
 * 把 `[path, name?, view]` 格式的 `routes` 选项转换为 vue-router 定义的格式,
 * 其中 `view` 是 `views` 文件夹中的某个 `.vue` 文件
 *
 * @param {Array<Array<String>> | Array<VueRouter.RouteConfig>} routes
 * @returns {Array<VueRouter.RouteConfig>}
 */
function normalizeRoutes (routes) {
  return routes.map(item => {
    if (Array.isArray(item) || typeof item === 'string') {
      if (typeof item === 'string') {
        item = [`/${item}`, item, item]
      } else if (item.length === 2) {
        item[2] = item[1]
      }

      let component = require(`views/${item[2]}`)
      if (component.default) component = component.default

      return {
        path: item[0],
        name: item[1],
        component
      }
    } else return item
  })
}

const base = '/board'
const router = new VueRouter({
  base,
  mode: 'history',
  routes: normalizeRoutes([
    ['/', 'index'],
    ['/:id', 'article'],
    ['*', '404']
  ])
})

// 添加 Google Analytics 页面访问统计
router.beforeEach((to, from, next) => {
  if (to.name !== '404') {
    pageView(`${base}/${to.name === 'index' ? '' : to.name}`)
  }

  return next()
})

// 强制浏览器保持当前位置
router.afterEach((to, from) => {
  const scrollY = window.scrollY
  setTimeout(() => window.scrollTo(0, scrollY), 0)
})

export default router
