'use strict'

// 引入 Polyfills
import 'core-js/fn/promise'
import 'core-js/fn/array/find'
import 'core-js/fn/array/find-index'
import 'core-js/fn/string/pad-start'

// 加载全局样式
import 'assets/styles/normalize.less'
import 'assets/styles/global.less'

// 引入 Vue 相关库
import Vue from 'vue'
import store from 'store'
import router from 'scripts/router'
import 'scripts/http'

;(function bootstrap () {
  // 启动 App
  new Vue({     // eslint-disable-line no-new
    store,
    router,
    el: '#app',
    name: 'App',
    render: h => h(require('./App'))
  })
})()
