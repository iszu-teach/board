'use strict'

// 在开发环境下禁用 ga
if (process.env.NODE_ENV === 'production') {
  /* eslint-disable */
  ;(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  /* eslint-enable */
} else {
  window.ga = function (...args) { console.log('ga', ...args) }
}

export function ga (...args) {
  window.ga(...args)
}

export function pageView (page) {
  ga('set', 'page', page)
  ga('send', 'pageview')
}

ga('create', 'UA-83885564-3', 'auto')
