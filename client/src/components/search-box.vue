<template>
  <form class="search-box-wrapper" :class="{ fade: fade && !focus, hide: hide }" @submit.prevent="confirm()">
    <div class="shade" v-if="focus" @click="focus = false"></div>
    <div class="search-box">
      <div class="search">
        <button type="button" @click="back">
          <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path v-if="focus" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            <path v-if="!focus && confirmed" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            <path v-if="!focus && !confirmed" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </button>
        <input type="search" class="keyword" :placeholder="confirmed ? filterLabel(filter) : '搜索标题/作者'" v-model="localFilter.keyword" :disabled="hide" @focus="focus = true">
        <button type="button" v-if="focus" @click="clear">
          <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
        <button type="submit" v-if="focus">
          <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </button>
      </div>
      <div class="filter" v-if="focus">
        <dropdown class="category" v-model="localFilter.category">
          <option value="all">全部信息</option>
          <option value="0">教学教务</option>
          <option value="1">学术科研</option>
          <option value="5">学术讲座</option>
          <option value="2">行政通知</option>
          <option value="3">学生工作</option>
          <option value="4">校园生活</option>
        </dropdown>
        <datepicker id="start" v-model="localFilter.start" placeholder="开始日期" :max="localFilter.end"></datepicker>
        <span>~</span>
        <datepicker id="end" v-model="localFilter.end" placeholder="结束日期" :min="localFilter.start"></datepicker>
      </div>
    </div>
    <ul class="saved-filters" v-if="focus">
      <li v-for="filter in savedFilters">
        <button class="recent" type="button" @click="chooseFromHistory(filter)">
          <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
            <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
          </svg>
        </button>
        <span @click="chooseFromHistory(filter)">
          <span>{{ filter.keyword }}</span>
          <span class="grey">{{ filterLabel(filter).substr((filter.keyword || '').length) }}</span>
        </span>
        <button type="button" @click="removeSavedFilter(filter)">
          <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </li>
    </ul>
  </form>
</template>

<script>
  import clone from 'lodash/clone'
  import isMatch from 'lodash/isMatch'
  import throttle from 'lodash/throttle'
  import differenceWith from 'lodash/differenceWith'
  import { filterLabel } from 'scripts/util'

  import { ga } from 'scripts/ga'
  import dropdown from 'components/dropdown'
  import datepicker from 'components/datepicker'

  // http://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
  function preventDefault (e) {
    e = e || window.event
    if (e.preventDefault) e.preventDefault()
    e.returnValue = false
  }

  function preventDefaultForScrollKeys (e) {
    // 禁用方向键
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      preventDefault(e)
      return false
    }
  }

  function disableScroll () {
    document.body.style.overflow = 'hidden'
    window.addEventListener('DOMMouseScroll', preventDefault)
    window.addEventListener('wheel', preventDefault)          // modern standard
    window.addEventListener('mousewheel', preventDefault)     // older browsers, IE
    document.addEventListener('mousewheel', preventDefault)
    window.addEventListener('touchmove', preventDefault)      // mobile
    document.addEventListener('keydown', preventDefaultForScrollKeys)
  }

  function enableScroll () {
    document.body.style.overflow = 'auto'
    window.removeEventListener('DOMMouseScroll', preventDefault)
    window.removeEventListener('wheel', preventDefault)          // modern standard
    window.removeEventListener('mousewheel', preventDefault)     // older browsers, IE
    document.removeEventListener('mousewheel', preventDefault)
    window.removeEventListener('touchmove', preventDefault)      // mobile
    document.removeEventListener('keydown', preventDefaultForScrollKeys)
  }

  let lastScrollY = 0
  const emptyFilter = () => ({
    keyword: '',
    start: '',
    end: '',
    category: 'all'
  })

  export default {
    components: {
      dropdown,
      datepicker
    },
    props: {
      filter: Object
    },
    data: () => ({
      fade: false,
      hide: false,
      focus: false,
      savedFilters: JSON.parse(window.localStorage.getItem('board-keywords') || '[]'),
      localFilter: emptyFilter()
    }),
    computed: {
      confirmed () {
        return !isMatch(this.filter, emptyFilter())
      }
    },
    methods: {
      filterLabel,
      chooseFromHistory (filter) {
        this.confirm(filter)
        ga('send', 'event', 'board', 'filter-history', 'select', this.savedFilters.indexOf(filter))
      },
      clear () {
        this.localFilter = emptyFilter()
      },
      back () {
        if (this.focus) this.focus = false
        else this.confirm(emptyFilter(), false)
      },
      confirm (filter = this.localFilter, save = true) {
        this.focus = false
        filter.keyword = filter.keyword.trim()
        this.$el.querySelector('input').blur()

        if (save) this.saveFilter(filter)
        this.localFilter = filter
        this.$emit('confirm', filter)
      },
      saveFilter (filter = this.localFilter) {
        if (isMatch(filter, emptyFilter())) return

        this.removeSavedFilter(filter)
        this.savedFilters.unshift(clone(filter))
        this.savedFilters.splice(5, this.savedFilters.length - 5)
      },
      removeSavedFilter (filter) {
        this.savedFilters = differenceWith(this.savedFilters, [filter], isMatch)
      },
      onscroll () {
        this.fade = window.scrollY > 64
        this.toggle()
      },
      toggle: throttle(function () {
        if (Math.abs(window.scrollY - lastScrollY) > 32) {
          this.hide = window.scrollY > lastScrollY
        }

        if (window.scrollY < 32) this.hide = false

        lastScrollY = window.scrollY
      }, 100),
      activate () { window.addEventListener('scroll', this.onscroll) },
      deactivate () { window.removeEventListener('scroll', this.onscroll) }
    },
    watch: {
      focus (value) {
        this.$nextTick(() => {
          if (value) {
            disableScroll()
            this.$el.querySelector('input').focus()
          } else {
            enableScroll()
            this.$el.querySelector('input').blur()
          }
        })
      },
      savedFilters (value) {
        window.localStorage.setItem('board-keywords', JSON.stringify(value))
      }
    },
    created () {
      if (this.$route.query.lectures) {
        this.localFilter.category = '5'
      }
    }
  }
</script>

<style lang="less">
  @import '../assets/styles/definition.less';

  .search-box-wrapper {
    position: fixed;
    z-index: 1;
    left: 0;
    right: 0;
    top: 0;
    padding: 12px 12px 0;
    transition: top 0.33s;
    transform: translateZ(0.0);

    &.fade {
      .fade-out-gradient(white, 100);
    }

    &.hide {
      top: -64px;
    }

    svg {
      fill: @md-grey-800;
    }

    button {
      width: 40px;
      height: 40px;
      padding: 8px;
      border: 0;
      outline: 0;
      background-color: transparent;
      appearance: none;
    }

    .dropdown {
      font-size: 14px;
    }

    .shade {
      position: fixed;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      background-color: fade(black, 33);
    }

    .search-box {
      position: relative;
      z-index: 1;
      border-radius: 2px;
      background-color: white;
      box-shadow: 0 2px 6px fade(black, 50);
      overflow: hidden;

      > div {
        display: flex;
        align-items: center;
      }
    }

    .keyword {
      flex: 1;
      height: 40px;
      padding: 0 8px;
      font-size: 14px;
      border: 0;
      outline: 0;
      background-color: transparent;
      appearance: none;
    }

    .filter {
      padding: 0 8px;
      border-top: 1px solid @md-grey-300;

      .category {
        width: 88px;
        margin: 0 8px;
        padding-left: 0;
        text-align: center;
      }

      span {
        margin: 0 4px;
        font-size: 14px;
      }

      .datepicker {
        flex: 1;
        height: 40px;
      }
    }

    .saved-filters:extend(.search-box-wrapper .search-box) {
      margin-top: 8px;
      display: block;
      font-size: 14px;

      li {
        height: 40px;
        display: flex;
        align-items: center;
        line-height: 40px;
        color: @md-grey-800;
        border-bottom: 1px solid @md-grey-300;
        cursor: default;

        &:last-child {
          border-bottom: 0;
        }

        > span {
          flex: 1;
          height: 40px;
          margin-left: 8px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .grey {
          color: @md-grey-500;
        }

        .recent svg {
          fill: @md-grey-500;
        }
      }
    }
  }
</style>
