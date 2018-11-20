'use strict'

import Vue from 'vue'
import state from '../store/state'
import actions from '../store/actions'
import { mapState, mapActions } from 'vuex'

// 创建一个全局 mixin
// 这样所有的组件都可以访问 vuex 的所有 state 和 actions
Vue.mixin({
  computed: {
    ...mapState(Object.keys(state)),
    ...mapActions(Object.keys(actions))
  }
})
