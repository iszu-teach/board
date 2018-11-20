'use strict'

import http from 'scripts/http'

let wxPromise = Promise.resolve(() => {})

export function initWechatJsapi (jsApiList = []) {
  if (/MicroMessenger/i.test(window.navigator.userAgent)) {
    wxPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script')
      s.setAttribute('src', 'https://res.wx.qq.com/open/js/jweixin-1.0.0.js')
      s.onload = async () => {
        const wx = window.wx
        const signedPackage = (await http.get(`../../wechat/jsapi?url=${encodeURIComponent(window.location.href)}`)).data
        if (signedPackage.success) {
          signedPackage.data.jsApiList = jsApiList
          wx.config(signedPackage.data)

          wx.ready(resolve)
          wx.error(reject)
        } else reject(signedPackage.message)
      }

      document.head.appendChild(s)
    })
  }

  return wxPromise
}

export function wechatJsapi () {
  return wxPromise.then(() => Promise.resolve(window.wx))
}
