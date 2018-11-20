'use strict'

import Vue from 'vue'
import axios from 'axios'

const resource = axios.create({
  baseURL: '/board/api',
  validateStatus: () => true    // 不管返回什么 http 状态码都不 reject
})

Vue.prototype.$http = resource
export default resource
