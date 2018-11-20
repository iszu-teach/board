<template>
  <li class="article-item" :class="{ read: read }">
    <router-link :to="link">
      <p class="title">
        <span v-if="article.sticky" class="sticky">置顶</span>
        <span v-html="highlight(article.title)"></span>
      </p>
      <p class="detail">
        <svg height="14" width="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>
        </svg>
        <span>{{ type }}</span>
        <svg height="18" width="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
        <span v-html="highlight(article.author)" style="flex-shrink: 1"></span>
        <svg class="last-edit" height="14" width="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
          <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
        </svg>
        <span>{{ article.lastEdit | datetime }}</span>
      </p>
    </router-link>
  </li>
</template>

<script>
  import escape from 'escape-string-regexp'
  import { articleTypeLookup, formatDateTime } from 'scripts/util'

  export default {
    props: {
      read: {
        type: Boolean,
        default: false
      },
      article: Object,
      keyword: String
    },
    computed: {
      link () {
        return {
          name: 'article',
          params: { id: this.article._id }
        }
      },
      keywordRegExp () {
        return new RegExp(`(${this.keyword.split(' ').map(s => escape(s)).join('|')})`, 'ig')
      },
      type () {
        if (this.article.lecture) return '讲座'
        else return articleTypeLookup(this.article.type)
      }
    },
    methods: {
      highlight (text) {
        if (this.keyword.trim()) {
          return text.replace(this.keywordRegExp, '<span class="highlight">$1</span>')
        } else return text
      }
    },
    filters: {
      datetime: formatDateTime
    }
  }
</script>

<style lang="less">
  @import '../assets/styles/definition.less';
  @border: @md-grey-300;

  .article-item {
    position: relative;
    border-bottom: 1px solid @border;

    &:last-child {
      border-bottom: 0;
    }

    a {
      padding: 16px;
      display: block;
      color: @md-grey-900;
    }

    .sticky {
      margin-right: 4px;
      color: @md-red-700;
    }

    span.highlight {
      color: @md-red-500;
      font-weight: bold;
    }

    .detail {
      margin-top: 8px;
      display: flex;
      align-items: center;
      font-size: @small;
      color: @md-grey-500;
      fill: @md-grey-500;

      > * {
        flex-shrink: 0;
      }

      svg {
        margin-right: 4px;
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

    &.read {
      background-color: @md-grey-100;

      .sticky {
        color: @md-red-200;
      }

      .title {
        color: @md-grey-500;
      }
    }
  }
</style>
