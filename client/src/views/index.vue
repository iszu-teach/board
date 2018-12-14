<template>
  <div id="index">
    <transition name="fade">
      <search-box v-show="showSearch" ref="search" :filter="filter" @confirm="search"></search-box>
    </transition>
    <transition name="page-fade">
      <ul class="articles-list" v-if="articles.length > 0">
        <article-item v-for="article in articles" :article="article" :keyword="filter.keyword" :read="isArticleRead(article)"></article-item>
      </ul>
    </transition>
    <div class="loading" v-html="loadingStateText"></div>
  </div>
</template>

<script>
  import { ga } from 'scripts/ga'
  import isMatch from 'lodash/isMatch'
  import searchBox from 'components/search-box'
  import articleItem from 'components/article-item'
  import { filterLabel } from 'scripts/util'
  import { initWechatJsapi, wechatJsapi } from 'scripts/wechat'
  import config from '../../../server/src/config'
  
  export default {
    components: {
      searchBox,
      articleItem
    },
    data: () => ({
      page: 0,
      filter: {
        keyword: '',
        start: '',
        end: '',
        category: 'all'
      },
      articles: [],
      readArticles: [],
      loadingState: 'loaded',
      scrollPosition: 0,
      showSearch: false
    }),
    computed: {
      loadingStateText () {
        if (this.loadingState === 'loading') return 'ε=ε=ε=(~￣▽￣)~ 嘿咻嘿咻…'
        else if (this.loadingState === 'end') return '没有喽 ~(～￣▽￣)～'
        else if (this.loadingState === 'error') return '正在等待<a href="/board/api/login" style="color: white !important; text-decoration: underline">校园卡登录</a>完成...请稍候'
      }
    },
    methods: {
      async load () {
        if (this.loadingState === 'loaded') {
          this.loadingState = 'loading'

          const params = Object.assign({ page: this.page }, this.filter)
          if (params.category === 'all') delete params.category
          Object.keys(params).forEach(key => { !params[key] && delete params[key] })

          const result = (await this.$http.get('articles', { params })).data
          if (result.success) {
            this.articles.push(...result.data)
            this.page++

            this.loadingState = result.data.length < 20 ? 'end' : 'loaded'
            ga('send', 'event', 'board', 'page', 'load-page', this.page)
          } else {
            console.error(result)
            this.loadingState = 'error'
          }
        }
      },
      isArticleRead (article) {
        const articleReadData = this.readArticles.find(item => item._id === article._id)
        if (articleReadData) return new Date(articleReadData.date) > new Date(article.lastEdit)
      },
      search (filter) {
        if (isMatch(this.filter, filter)) return
        else this.filter = Object.assign({}, filter)

        this.page = 0
        this.articles = []
        this.loadingState = 'loaded'
        this.load()

        ga('send', 'event', 'board', 'filter', filterLabel(this.filter))
      },
      onscroll () {
        if (window.scrollY + window.innerHeight >= document.body.getBoundingClientRect().height - 200) {
          this.load()
        }
      }
    },
    created () {
      if (this.$route.query.lectures) {
        this.filter.category = '5'
        document.title = '讲座查询'
        ga('send', 'event', 'board', 'lecture', 1)
      }

      this.load()
    },
    mounted () {
      this.$nextTick(() => { this.showSearch = true })
    },
    beforeRouteEnter (to, from, next) {
      next(async vm => {
        window.scrollTo(0, vm.scrollPosition)

        vm.onscroll()
        vm.$refs.search.activate()
        window.addEventListener('scroll', vm.onscroll)

        vm.readArticles = JSON.parse(window.localStorage.getItem('board-read-articles') || '[]')

        // 初始化微信相关功能
        initWechatJsapi(['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ'])
        const wx = await wechatJsapi()
        if (wx) {
          const imgUrl = 'http://7xjh4c.com1.z0.glb.clouddn.com/image/logo.jpg'

          wx.onMenuShareTimeline({
            title: '深圳大学校园公文通【深大官微】',
            link: `${config.root}/board`,
            imgUrl,
            success: () => ga('send', 'event', 'board', 'share', 'timeline')
          })

          wx.onMenuShareAppMessage({
            title: '深圳大学校园公文通',
            desc: '深大官微',
            link: `${config.root}/board`,
            imgUrl,
            success: () => ga('send', 'event', 'board', 'share', 'app-message')
          })

          wx.onMenuShareQQ({
            title: '深圳大学校园公文通',
            desc: '深大官微',
            link: `${config.root}/board`,
            imgUrl,
            success: () => ga('send', 'event', 'board', 'share', 'qq')
          })
        }
      })
    },
    beforeRouteLeave (to, from, next) {
      this.scrollPosition = window.scrollY
      this.$refs.search.deactivate()
      window.removeEventListener('scroll', this.onscroll)

      return next()
    }
  }
</script>

<style lang="less">
  @import '../assets/styles/definition.less';

  #index {
    padding-top: 64px;
    background-color: @main-color;

    .articles-list {
      background-color: white;
      box-shadow: @2px-shadow;
    }

    .loading {
      padding: 32px 0;
      font-size: @small;
      text-align: center;
      color: white;
    }
  }
</style>
