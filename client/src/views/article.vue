<template>
  <div id="article">
    <header>
      <h1>{{ article.title }}</h1>
      <p class="detail">
        <svg height="14" width="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>
        </svg>
        <span>{{ type }}</span>
        <svg height="18" width="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
        <span style="flex-shrink: 1">{{ article.author }}</span>
        <svg class="last-edit" height="14" width="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
          <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
        </svg>
        <span>{{ article.lastEdit | datetime }}</span>
      </p>
      <button class="back-fab" @click="goBack">
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
      </button>
      <button class="top-fab" @click="scrollTop">
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
        </svg>
      </button>
    </header>
    <article v-html="content"></article>
    <aside class="attachments" v-if="article.attachments.length > 0">
      <h2>附件</h2>
      <ul>
        <li v-for="attachment in article.attachments">
          <a :href="'http://www1.szu.edu.cn/board/' + attachment.href">{{ attachment.name }}</a>
        </li>
      </ul>
    </aside>
    <aside class="detail">
      <h2>文章信息</h2>
      <ul>
        <li>文章标题：{{ article.title }}</li>
        <li>发文单位：{{ article.author }}</li>
        <li>发布时间：{{ article.date | datetime }}</li>
        <li>修改时间：{{ article.lastEdit | datetime }}</li>
        <li>原文链接：<a :href="'http://www1.szu.edu.cn/board/view.asp?id=' + article._id">{{ 'http://www1.szu.edu.cn/board/view.asp?id=' + article._id }}</a></li>
      </ul>
    </aside>
    <footer>
      <img src="../assets/images/iszu.jpg">
      <div>
        <div>更多权威消息</div>
        <div>深大新闻、精彩活动</div>
        <div>请关注【深圳大学】</div>
        <div>官方微信</div>
      </div>
    </footer>
  </div>
</template>

<script>
  import { ga } from 'scripts/ga'
  import isMatch from 'lodash/isMatch'
  import differenceWith from 'lodash/differenceWith'
  import { initWechatJsapi, wechatJsapi } from 'scripts/wechat'
  import { articleTypeLookup, formatDateTime } from 'scripts/util'

  const emptyArticle = () => ({
    title: '正在加载...',
    author: '还在加载',
    lastEdit: '别急嘛~\\(≧▽≦)/~',
    attachments: []
  })

  export default {
    data: () => ({
      article: emptyArticle()
    }),
    computed: {
      type () {
        return articleTypeLookup(this.article.type)
      },
      content () {
        return (this.article.content || '').replace(/(<table>.*<\/table>)/, '<div class="table"><div class="table-inner-space">$1</div></div>')
      }
    },
    methods: {
      goBack () {
        this.$router.push({ name: 'index' })
        ga('send', 'event', 'board', 'button', 'back')
      },
      scrollTop () {
        window.scrollTo(0, 0)
        ga('send', 'event', 'board', 'button', 'top')
      },
      async load () {
        const result = (await this.$http.get(`article/${this.$route.params.id}`)).data
        if (result.success) {
          this.headerHeight = 0
          this.article = result.data

          this.setRead()
          this.$nextTick(this.adjustTables)
          ga('send', 'event', 'board', 'view', this.article._id)
        }
      },
      setRead () {
        let read = JSON.parse(window.localStorage.getItem('board-read-articles') || '[]')
        read = differenceWith(read, [{ _id: this.article._id }], isMatch)

        read.unshift({
          _id: this.article._id,
          date: Date.now()
        })
        read.splice(250, read.length - 250)
        window.localStorage.setItem('board-read-articles', JSON.stringify(read))
      },
      adjustTables () {
        const tds = this.$el.querySelectorAll('table td')
        for (let i = 0; i < tds.length; i++) {
          const td = tds[i]
          if (td.colSpan === 1 && td.getBoundingClientRect().width > window.innerWidth - 40) {
            td.innerHTML = `<div style="width: ${window.innerWidth - 40}px; white-space: normal">${td.innerHTML}</div>`
          }
        }
      }
    },
    filters: {
      datetime: formatDateTime
    },
    created () {
      this.load()
    },
    watch: {
      $route () {
        if (this.$route.name === 'article') {
          this.article = emptyArticle()
          this.load()
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      next(async vm => {
        window.scrollTo(0, 0)
        window.addEventListener('scroll', vm.onscroll)

        // 初始化微信相关功能
        initWechatJsapi(['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ'])
        const wx = await wechatJsapi()
        if (wx) {
          const imgUrl = 'http://7xjh4c.com1.z0.glb.clouddn.com/image/logo.jpg'
          const desc = document.querySelector('article').textContent.trim()

          wx.onMenuShareTimeline({
            title: `${vm.article.title}【深大官微】`,
            link: `https://iszu.cn/board/${vm.article._id}`,
            imgUrl,
            success: () => ga('send', 'event', 'board', 'share', 'timeline')
          })

          wx.onMenuShareAppMessage({
            title: `${vm.article.title}【深大官微】`,
            link: `https://iszu.cn/board/${vm.article._id}`,
            desc,
            imgUrl,
            success: () => ga('send', 'event', 'board', 'share', 'app-message')
          })

          wx.onMenuShareQQ({
            title: `${vm.article.title}【深大官微】`,
            link: `https://iszu.cn/board/${vm.article._id}`,
            desc,
            imgUrl,
            success: () => ga('send', 'event', 'board', 'share', 'qq')
          })
        }
      })
    },
    beforeRouteLeave (to, from, next) {
      window.removeEventListener('scroll', this.onscroll)
      return next()
    }
  }
</script>

<style lang="less">
  @import '../assets/styles/definition.less';

  #article {
    padding-bottom: 32px;
    background-color: white;

    header {
      position: relative;
      padding: 24px 24px 16px;
      background-color: @main-color;
      box-shadow: @2px-shadow;

      h1 {
        margin: 0;
        font-size: 20px;
        line-height: 20px * 1.33;
        color: white;
      }

      .detail {
        margin-top: 16px;
        display: flex;
        align-items: center;
        font-size: @small;
        color: white;

        > * {
          flex-shrink: 0;
        }

        svg {
          margin-right: 4px;
          fill: white;
        }

        span {
          margin-right: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          &:last-child {
            margin-right: 0;
          }
        }

        .last-edit {
          margin-left: auto;
        }
      }

      .back-fab, .top-fab {
        position: fixed;
        bottom: 16px;
        right: 16px;
        width: 40px;
        height: 40px;
        padding: 8px;
        border: 0;
        border-radius: 50%;
        outline: 0;
        background-color: @md-grey-100;
        box-shadow: @2px-shadow;
        appearance: none;
        opacity: 0.9;
      }

      .back-fab {
        left: 16px;
      }
    }

    article {
      @size: 16px;

      margin-top: 32px;
      padding: 0 16px 16px;
      font-size: @size;
      line-height: @size * 1.67;

      p, .table {
        margin: @size 0;
      }

      img {
        width: 100%;
      }

      .table {
        min-width: 100%;
        margin: 0 -16px;
        padding: 0;
        overflow: auto;

        .table-inner-space {
          min-width: 100%;
          padding: 0 @size;
          display: inline-block;
        }
      }

      table {
        min-width: 100%;
        font-size: @size * 0.9;
        line-height: @size * 0.9 * 1.25;
        white-space: nowrap;

        p {
          margin: 4px 0;
        }
      }

      th, td {
        padding: 4px 8px;
        border: 1px solid @md-grey-800;
      }
    }

    aside {
      margin: 0 24px;
      padding: 16px;
      border: 1px solid @md-grey-300;
      border-radius: 2px;
      background-color: @md-grey-100;

      h2 {
        margin-bottom: 12px;
        font-size: @large;
        color: @main-color;
      }

      li {
        margin: 4px 0 4px 4px;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        a, a:visited {
          color: @md-blue-500;
        }
      }

      &.detail {
        margin-top: 16px;
      }
    }

    footer {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 32px;
      font-size: 14px;

      img {
        width: 128px;
        margin-right: 16px;
      }
    }
  }
</style>
