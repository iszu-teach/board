webpackJsonp([2,0],{0:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}n(194),n(193),n(192),n(195),n(276),n(275);var a=n(53),i=r(a),o=n(178),s=r(o),l=n(176),c=r(l);n(96),function(){new i.default({store:s.default,router:c.default,el:"#app",name:"App",render:function(t){return t(n(390))}})}()},33:function(t,e,n){"use strict";function r(){var t;(t=window).ga.apply(t,arguments)}function a(t){r("set","page",t),r("send","pageview")}Object.defineProperty(e,"__esModule",{value:!0}),e.ga=r,e.pageView=a,!function(t,e,n,r,a,i,o){t.GoogleAnalyticsObject=a,t[a]=t[a]||function(){(t[a].q=t[a].q||[]).push(arguments)},t[a].l=1*new Date,i=e.createElement(n),o=e.getElementsByTagName(n)[0],i.async=1,i.src=r,o.parentNode.insertBefore(i,o)}(window,document,"script","https://www.google-analytics.com/analytics.js","ga"),r("create","UA-83885564-3","auto")},34:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function a(t){return u[t]||"未知"}function i(t){return t.toString().padStart(2,"0")}function o(t){var e=new Date(t);return(0,c.default)(+e)?t:e.getFullYear()+"-"+i(e.getMonth()+1)+"-"+i(e.getDate())+" "+i(e.getHours())+":"+i(e.getMinutes())}function s(t){var e=[];return t.keyword&&e.push(t.keyword),"all"!==t.category&&e.push("分类: "+a(+t.category)),t.start&&!t.end?e.push("从"+t.start+"到现在"):!t.start&&t.end?e.push(t.end+"以及之前"):t.start&&t.end&&e.push(t.start+" ~ "+t.end),e.join(", ")}Object.defineProperty(e,"__esModule",{value:!0});var l=n(188),c=r(l);e.articleTypeLookup=a,e.formatDateTime=o,e.filterLabel=s;var u=["教务","学术","行政","学工","生活","讲座"]},96:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(53),i=r(a),o=n(158),s=r(o),l=s.default.create({baseURL:"/board/api",validateStatus:function(){return!0}});i.default.prototype.$http=l,e.default=l},97:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function a(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return/MicroMessenger/i.test(window.navigator.userAgent)&&(p=new d.default(function(n,r){var a=document.createElement("script");a.setAttribute("src","https://res.wx.qq.com/open/js/jweixin-1.0.0.js"),a.onload=(0,c.default)(s.default.mark(function a(){var i,o;return s.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return i=window.wx,t.next=3,v.default.get("../../wechat/jsapi?url="+encodeURIComponent(window.location.href));case 3:o=t.sent.data,o.success?(o.data.jsApiList=e,i.config(o.data),i.ready(n),i.error(r)):r(o.message);case 5:case"end":return t.stop()}},a,t)})),document.head.appendChild(a)})),p}function i(){return p.then(function(){return d.default.resolve(window.wx)})}Object.defineProperty(e,"__esModule",{value:!0});var o=n(56),s=r(o),l=n(55),c=r(l),u=n(99),d=r(u);e.initWechatJsapi=a,e.wechatJsapi=i;var f=n(96),v=r(f),p=d.default.resolve(function(){})},154:function(t,e,n){var r,a,i=n(399);a=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(a=r=r.default),"function"==typeof a&&(a=a.options),a.render=i.render,a.staticRenderFns=i.staticRenderFns,t.exports=r},155:function(t,e,n){var r,a;n(283),r=n(185);var i=n(402);a=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(a=r=r.default),"function"==typeof a&&(a=a.options),a.render=i.render,a.staticRenderFns=i.staticRenderFns,t.exports=r},156:function(t,e,n){var r,a;n(281),r=n(186);var i=n(400);a=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(a=r=r.default),"function"==typeof a&&(a=a.options),a.render=i.render,a.staticRenderFns=i.staticRenderFns,t.exports=r},157:function(t,e,n){(function(e){"use strict";const r=n(384);t.exports={db:"mongodb://szuwechat:szu0408@localhost:28018/",log:r.resolve(e,"../../../logs/board.log"),base:"board",port:"3002",root:"http://szuwechat.cn",secret:"szu0408"}}).call(e,"/")},176:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function a(t){return t.map(function(t){if(Array.isArray(t)||"string"==typeof t){"string"==typeof t?t=["/"+t,t,t]:2===t.length&&(t[2]=t[1]);var e=n(406)("./"+t[2]);return e.default&&(e=e.default),{path:t[0],name:t[1],component:e}}return t})}Object.defineProperty(e,"__esModule",{value:!0});var i=n(53),o=r(i),s=n(403),l=r(s),c=n(33);o.default.use(l.default);var u="/board",d=new l.default({base:u,mode:"history",routes:a([["/","index"],["/:id","article"],["*","404"]])});d.beforeEach(function(t,e,n){return"404"!==t.name&&(0,c.pageView)(u+"/"+("index"===t.name?"":t.name)),n()}),d.afterEach(function(t,e){var n=window.scrollY;setTimeout(function(){return window.scrollTo(0,n)},0)}),e.default=d},177:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={}},178:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(53),i=r(a),o=n(405),s=r(o),l=n(180),c=r(l),u=n(177),d=r(u),f=n(179),v=r(f);i.default.use(s.default),e.default=new s.default.Store({state:c.default,actions:d.default,mutations:v.default})},179:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={}},180:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={}},181:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(274),i=r(a),o=n(34);e.default={props:{read:{type:Boolean,default:!1},article:Object,keyword:String},computed:{link:function(){return{name:"article",params:{id:this.article._id}}},keywordRegExp:function(){return new RegExp("("+this.keyword.split(" ").map(function(t){return(0,i.default)(t)}).join("|")+")","ig")},type:function(){return this.article.lecture?"讲座":(0,o.articleTypeLookup)(this.article.type)}},methods:{highlight:function(t){return this.keyword.trim()?t.replace(this.keywordRegExp,'<span class="highlight">$1</span>'):t}},filters:{datetime:o.formatDateTime}}},182:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{id:{type:String,required:!0},value:{type:String,default:""},placeholder:String,max:String,min:String}}},183:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{value:{type:String,default:""}}}},184:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function a(t){t=t||window.event,t.preventDefault&&t.preventDefault(),t.returnValue=!1}function i(t){if(t.keyCode>=37&&t.keyCode<=40)return a(t),!1}function o(){document.body.style.overflow="hidden",window.addEventListener("DOMMouseScroll",a),window.addEventListener("wheel",a),window.addEventListener("mousewheel",a),document.addEventListener("mousewheel",a),window.addEventListener("touchmove",a),document.addEventListener("keydown",i)}function s(){document.body.style.overflow="auto",window.removeEventListener("DOMMouseScroll",a),window.removeEventListener("wheel",a),window.removeEventListener("mousewheel",a),document.removeEventListener("mousewheel",a),window.removeEventListener("touchmove",a),document.removeEventListener("keydown",i)}Object.defineProperty(e,"__esModule",{value:!0});var l=n(98),c=r(l),u=n(372),d=r(u),f=n(88),v=r(f),p=n(382),h=r(p),w=n(146),g=r(w),_=n(34),m=n(33),y=n(393),b=r(y),x=n(392),M=r(x),k=0,S=function(){return{keyword:"",start:"",end:"",category:"all"}};e.default={components:{dropdown:b.default,datepicker:M.default},props:{filter:Object},data:function(){return{fade:!1,hide:!1,focus:!1,savedFilters:JSON.parse(window.localStorage.getItem("board-keywords")||"[]"),localFilter:S()}},computed:{confirmed:function(){return!(0,v.default)(this.filter,S())}},methods:{filterLabel:_.filterLabel,chooseFromHistory:function(t){this.confirm(t),(0,m.ga)("send","event","board","filter-history","select",this.savedFilters.indexOf(t))},clear:function(){this.localFilter=S()},back:function(){this.focus?this.focus=!1:this.confirm(S(),!1)},confirm:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.localFilter,e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.focus=!1,t.keyword=t.keyword.trim(),this.$el.querySelector("input").blur(),e&&this.saveFilter(t),this.localFilter=t,this.$emit("confirm",t)},saveFilter:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.localFilter;(0,v.default)(t,S())||(this.removeSavedFilter(t),this.savedFilters.unshift((0,d.default)(t)),this.savedFilters.splice(5,this.savedFilters.length-5))},removeSavedFilter:function(t){this.savedFilters=(0,g.default)(this.savedFilters,[t],v.default)},onscroll:function(){this.fade=window.scrollY>64,this.toggle()},toggle:(0,h.default)(function(){Math.abs(window.scrollY-k)>32&&(this.hide=window.scrollY>k),window.scrollY<32&&(this.hide=!1),k=window.scrollY},100),activate:function(){window.addEventListener("scroll",this.onscroll)},deactivate:function(){window.removeEventListener("scroll",this.onscroll)}},watch:{focus:function(t){var e=this;this.$nextTick(function(){t?(o(),e.$el.querySelector("input").focus()):(s(),e.$el.querySelector("input").blur())})},savedFilters:function(t){window.localStorage.setItem("board-keywords",(0,c.default)(t))}},created:function(){this.$route.query.lectures&&(this.localFilter.category="5")}}},185:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(98),i=r(a),o=n(56),s=r(o),l=n(55),c=r(l),u=n(33),d=n(88),f=r(d),v=n(146),p=r(v),h=n(97),w=n(34),g=n(157),_=r(g),m=function(){return{title:"正在加载...",author:"还在加载",lastEdit:"别急嘛~\\(≧▽≦)/~",attachments:[]}};e.default={data:function(){return{article:m()}},computed:{type:function(){return(0,w.articleTypeLookup)(this.article.type)},content:function(){return(this.article.content||"").replace(/(<table>.*<\/table>)/,'<div class="table"><div class="table-inner-space">$1</div></div>')}},methods:{goBack:function(){this.$router.push({name:"index"}),(0,u.ga)("send","event","board","button","back")},scrollTop:function(){window.scrollTo(0,0),(0,u.ga)("send","event","board","button","top")},load:function(){var t=this;return(0,c.default)(s.default.mark(function e(){var n;return s.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("article/"+t.$route.params.id);case 2:n=e.sent.data,n.success&&(t.headerHeight=0,t.article=n.data,t.article.title=n.data.title.replace(/&nbsp;/g," "),t.setRead(),t.$nextTick(t.adjustTables),(0,u.ga)("send","event","board","view",t.article._id));case 4:case"end":return e.stop()}},e,t)}))()},setRead:function(){var t=JSON.parse(window.localStorage.getItem("board-read-articles")||"[]");t=(0,p.default)(t,[{_id:this.article._id}],f.default),t.unshift({_id:this.article._id,date:Date.now()}),t.splice(250,t.length-250),window.localStorage.setItem("board-read-articles",(0,i.default)(t))},adjustTables:function(){for(var t=this.$el.querySelectorAll("table td"),e=0;e<t.length;e++){var n=t[e];1===n.colSpan&&n.getBoundingClientRect().width>window.innerWidth-40&&(n.innerHTML='<div style="width: '+(window.innerWidth-40)+'px; white-space: normal">'+n.innerHTML+"</div>")}}},filters:{datetime:w.formatDateTime},created:function(){this.load()},watch:{$route:function(){"article"===this.$route.name&&(this.article=m(),this.load())}},beforeRouteEnter:function(t,e,n){var r=this;n(function(){var t=(0,c.default)(s.default.mark(function t(e){var n,a,i;return s.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return window.scrollTo(0,0),window.addEventListener("scroll",e.onscroll),(0,h.initWechatJsapi)(["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ"]),t.next=5,(0,h.wechatJsapi)();case 5:n=t.sent,n&&(a="http://7xjh4c.com1.z0.glb.clouddn.com/image/logo.jpg",i=document.querySelector("article").textContent.trim(),n.onMenuShareTimeline({title:e.article.title+"【深大官微】",link:_.default.root+"board/"+e.article._id,imgUrl:a,success:function(){return(0,u.ga)("send","event","board","share","timeline")}}),n.onMenuShareAppMessage({title:e.article.title+"【深大官微】",link:_.default.root+"/board/"+e.article._id,desc:i,imgUrl:a,success:function(){return(0,u.ga)("send","event","board","share","app-message")}}),n.onMenuShareQQ({title:e.article.title+"【深大官微】",link:_.default.root+"board/"+e.article._id,desc:i,imgUrl:a,success:function(){return(0,u.ga)("send","event","board","share","qq")}}));case 7:case"end":return t.stop()}},t,r)}));return function(e){return t.apply(this,arguments)}}())},beforeRouteLeave:function(t,e,n){return window.removeEventListener("scroll",this.onscroll),n()}}},186:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(56),i=r(a),o=n(191),s=r(o),l=n(190),c=r(l),u=n(189),d=r(u),f=n(55),v=r(f),p=n(33),h=n(88),w=r(h),g=n(394),_=r(g),m=n(391),y=r(m),b=n(34),x=n(97),M=n(157),k=r(M);e.default={components:{searchBox:_.default,articleItem:y.default},data:function(){return{page:0,filter:{keyword:"",start:"",end:"",category:"all"},articles:[],readArticles:[],loadingState:"loaded",scrollPosition:0,showSearch:!1}},computed:{loadingStateText:function(){return"loading"===this.loadingState?"ε=ε=ε=(~￣▽￣)~ 嘿咻嘿咻…":"end"===this.loadingState?"没有喽 ~(～￣▽￣)～":"error"===this.loadingState?'正在等待<a href="/board/api/login" style="color: white !important; text-decoration: underline">校园卡登录</a>完成...请稍候':void 0}},methods:{load:function(){var t=this;return(0,v.default)(i.default.mark(function e(){var n,r,a;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if("loaded"!==t.loadingState){e.next=9;break}return t.loadingState="loading",n=(0,d.default)({page:t.page},t.filter),"all"===n.category&&delete n.category,(0,c.default)(n).forEach(function(t){!n[t]&&delete n[t]}),e.next=7,t.$http.get("articles",{params:n});case 7:r=e.sent.data,r.success?((a=t.articles).push.apply(a,(0,s.default)(r.data)),t.page++,t.loadingState=r.data.length<20?"end":"loaded",(0,p.ga)("send","event","board","page","load-page",t.page)):(console.error(r),t.loadingState="error");case 9:case"end":return e.stop()}},e,t)}))()},isArticleRead:function(t){var e=this.readArticles.find(function(e){return e._id===t._id});if(e)return new Date(e.date)>new Date(t.lastEdit)},search:function(t){(0,w.default)(this.filter,t)||(this.filter=(0,d.default)({},t),this.page=0,this.articles=[],this.loadingState="loaded",this.load(),(0,p.ga)("send","event","board","filter",(0,b.filterLabel)(this.filter)))},onscroll:function(){window.scrollY+window.innerHeight>=document.body.getBoundingClientRect().height-200&&this.load()}},created:function(){this.$route.query.lectures&&(this.filter.category="5",document.title="讲座查询",(0,p.ga)("send","event","board","lecture",1)),this.load()},mounted:function(){var t=this;this.$nextTick(function(){t.showSearch=!0})},beforeRouteEnter:function(t,e,n){var r=this;n(function(){var t=(0,v.default)(i.default.mark(function t(e){var n,a;return i.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return window.scrollTo(0,e.scrollPosition),e.onscroll(),e.$refs.search.activate(),window.addEventListener("scroll",e.onscroll),e.readArticles=JSON.parse(window.localStorage.getItem("board-read-articles")||"[]"),(0,x.initWechatJsapi)(["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ"]),t.next=8,(0,x.wechatJsapi)();case 8:n=t.sent,n&&(a="http://7xjh4c.com1.z0.glb.clouddn.com/image/logo.jpg",n.onMenuShareTimeline({title:"深圳大学校园公文通【深大官微】",link:k.default.root+"/board",imgUrl:a,success:function(){return(0,p.ga)("send","event","board","share","timeline")}}),n.onMenuShareAppMessage({title:"深圳大学校园公文通",desc:"深大官微",link:k.default.root+"/board",imgUrl:a,success:function(){return(0,p.ga)("send","event","board","share","app-message")}}),n.onMenuShareQQ({title:"深圳大学校园公文通",desc:"深大官微",link:k.default.root+"/board",imgUrl:a,success:function(){return(0,p.ga)("send","event","board","share","qq")}}));case 10:case"end":return t.stop()}},t,r)}));return function(e){return t.apply(this,arguments)}}())},beforeRouteLeave:function(t,e,n){return this.scrollPosition=window.scrollY,this.$refs.search.deactivate(),window.removeEventListener("scroll",this.onscroll),n()}}},275:function(t,e){},276:function(t,e){},277:function(t,e){},278:function(t,e){},279:function(t,e){},280:function(t,e){},281:function(t,e){},282:function(t,e){},283:function(t,e){},389:function(t,e,n){t.exports=n.p+"static/img/iszu.1b56eef.jpg"},390:function(t,e,n){var r,a;n(280);var i=n(398);a=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(a=r=r.default),"function"==typeof a&&(a=a.options),a.render=i.render,a.staticRenderFns=i.staticRenderFns,t.exports=r},391:function(t,e,n){var r,a;n(278),r=n(181);var i=n(396);a=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(a=r=r.default),"function"==typeof a&&(a=a.options),a.render=i.render,a.staticRenderFns=i.staticRenderFns,t.exports=r},392:function(t,e,n){var r,a;n(277),r=n(182);var i=n(395);a=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(a=r=r.default),"function"==typeof a&&(a=a.options),a.render=i.render,a.staticRenderFns=i.staticRenderFns,t.exports=r},393:function(t,e,n){var r,a;n(282),r=n(183);var i=n(401);a=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(a=r=r.default),"function"==typeof a&&(a=a.options),a.render=i.render,a.staticRenderFns=i.staticRenderFns,t.exports=r},394:function(t,e,n){var r,a;n(279),r=n(184);var i=n(397);a=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(a=r=r.default),"function"==typeof a&&(a=a.options),a.render=i.render,a.staticRenderFns=i.staticRenderFns,t.exports=r},395:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"datepicker"},[n("label",{class:{empty:!t.value},attrs:{for:t.id}},[t._v(t._s(t.value||t.placeholder))]),t._v(" "),n("input",{attrs:{type:"date",id:t.id,max:t.max,min:t.min},domProps:{value:t.value},on:{input:function(e){return t.$emit("input",e.target.value)}}})])},staticRenderFns:[]}},396:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",{staticClass:"article-item",class:{read:t.read}},[n("router-link",{attrs:{to:t.link}},[n("p",{staticClass:"title"},[t.article.sticky?n("span",{staticClass:"sticky"},[t._v("置顶")]):t._e(),t._v(" "),n("span",{domProps:{innerHTML:t._s(t.highlight(t.article.title))}})]),t._v(" "),n("p",{staticClass:"detail"},[n("svg",{attrs:{height:"14",width:"14",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{d:"M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"}})]),t._v(" "),n("span",[t._v(t._s(t.type))]),t._v(" "),n("svg",{attrs:{height:"18",width:"18",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{d:"M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"}})]),t._v(" "),n("span",{staticStyle:{"flex-shrink":"1"},domProps:{innerHTML:t._s(t.highlight(t.article.author))}}),t._v(" "),n("svg",{staticClass:"last-edit",attrs:{height:"14",width:"14",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{d:"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}}),t._v(" "),n("path",{attrs:{d:"M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"}})]),t._v(" "),n("span",[t._v(t._s(t._f("datetime")(t.article.lastEdit)))])])])],1)},staticRenderFns:[]}},397:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("form",{staticClass:"search-box-wrapper",class:{fade:t.fade&&!t.focus,hide:t.hide},on:{submit:function(e){return e.preventDefault(),t.confirm()}}},[t.focus?n("div",{staticClass:"shade",on:{click:function(e){t.focus=!1}}}):t._e(),t._v(" "),n("div",{staticClass:"search-box"},[n("div",{staticClass:"search"},[n("button",{attrs:{type:"button"},on:{click:t.back}},[n("svg",{attrs:{height:"24",width:"24",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"}},[t.focus?n("path",{attrs:{d:"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"}}):t._e(),t._v(" "),!t.focus&&t.confirmed?n("path",{attrs:{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}}):t._e(),t._v(" "),t.focus||t.confirmed?t._e():n("path",{attrs:{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}})])]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.localFilter.keyword,expression:"localFilter.keyword"}],staticClass:"keyword",attrs:{type:"search",placeholder:t.confirmed?t.filterLabel(t.filter):"搜索标题/作者",disabled:t.hide},domProps:{value:t.localFilter.keyword},on:{focus:function(e){t.focus=!0},input:function(e){e.target.composing||t.$set(t.localFilter,"keyword",e.target.value)}}}),t._v(" "),t.focus?n("button",{attrs:{type:"button"},on:{click:t.clear}},[n("svg",{attrs:{height:"24",width:"24",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}})])]):t._e(),t._v(" "),t.focus?n("button",{attrs:{type:"submit"}},[n("svg",{attrs:{height:"24",width:"24",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}})])]):t._e()]),t._v(" "),t.focus?n("div",{staticClass:"filter"},[n("dropdown",{staticClass:"category",model:{value:t.localFilter.category,callback:function(e){t.$set(t.localFilter,"category",e)},expression:"localFilter.category"}},[n("option",{attrs:{value:"all"}},[t._v("全部信息")]),t._v(" "),n("option",{attrs:{value:"0"}},[t._v("教学教务")]),t._v(" "),n("option",{attrs:{value:"1"}},[t._v("学术科研")]),t._v(" "),n("option",{attrs:{value:"5"}},[t._v("学术讲座")]),t._v(" "),n("option",{attrs:{value:"2"}},[t._v("行政通知")]),t._v(" "),n("option",{attrs:{value:"3"}},[t._v("学生工作")]),t._v(" "),n("option",{attrs:{value:"4"}},[t._v("校园生活")])]),t._v(" "),n("datepicker",{attrs:{id:"start",placeholder:"开始日期",max:t.localFilter.end},model:{value:t.localFilter.start,callback:function(e){t.$set(t.localFilter,"start",e)},expression:"localFilter.start"}}),t._v(" "),n("span",[t._v("~")]),t._v(" "),n("datepicker",{attrs:{id:"end",placeholder:"结束日期",min:t.localFilter.start},model:{value:t.localFilter.end,callback:function(e){t.$set(t.localFilter,"end",e)},expression:"localFilter.end"}})],1):t._e()]),t._v(" "),t.focus?n("ul",{staticClass:"saved-filters"},t._l(t.savedFilters,function(e){return n("li",[n("button",{staticClass:"recent",attrs:{type:"button"},on:{click:function(n){return t.chooseFromHistory(e)}}},[n("svg",{attrs:{height:"24",width:"24",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{d:"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}}),t._v(" "),n("path",{attrs:{d:"M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"}})])]),t._v(" "),n("span",{on:{click:function(n){return t.chooseFromHistory(e)}}},[n("span",[t._v(t._s(e.keyword))]),t._v(" "),n("span",{staticClass:"grey"},[t._v(t._s(t.filterLabel(e).substr((e.keyword||"").length)))])]),t._v(" "),n("button",{attrs:{type:"button"},on:{click:function(n){return t.removeSavedFilter(e)}}},[n("svg",{attrs:{height:"24",width:"24",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}})])])])}),0):t._e()])},staticRenderFns:[]}},398:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"page-fade",mode:"out-in"}},[n("keep-alive",[n("router-view",{staticClass:"page"})],1)],1)},staticRenderFns:[]}},399:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[t._v("Opps... This page is not found")])},staticRenderFns:[]}},400:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"index"}},[n("transition",{attrs:{name:"fade"}},[n("search-box",{directives:[{name:"show",rawName:"v-show",value:t.showSearch,expression:"showSearch"}],ref:"search",attrs:{filter:t.filter},on:{confirm:t.search}})],1),t._v(" "),n("transition",{attrs:{name:"page-fade"}},[t.articles.length>0?n("ul",{staticClass:"articles-list"},t._l(t.articles,function(e){return n("article-item",{attrs:{article:e,keyword:t.filter.keyword,read:t.isArticleRead(e)}})}),1):t._e()]),t._v(" "),n("div",{staticClass:"loading",domProps:{innerHTML:t._s(t.loadingStateText)}})],1)},staticRenderFns:[]}},401:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("select",{staticClass:"dropdown",domProps:{value:t.value},on:{input:function(e){return t.$emit("input",e.target.value)}}},[t._t("default")],2)},staticRenderFns:[]}},402:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"article"}},[n("header",[n("h1",[t._v(t._s(t.article.title))]),t._v(" "),n("p",{staticClass:"detail"},[n("svg",{attrs:{height:"14",width:"14",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{d:"M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"}})]),t._v(" "),n("span",[t._v(t._s(t.type))]),t._v(" "),n("svg",{attrs:{height:"18",width:"18",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{d:"M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"}})]),t._v(" "),n("span",{staticStyle:{"flex-shrink":"1"}},[t._v(t._s(t.article.author))]),t._v(" "),n("svg",{staticClass:"last-edit",attrs:{height:"14",width:"14",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{d:"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}}),t._v(" "),n("path",{attrs:{d:"M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"}})]),t._v(" "),n("span",[t._v(t._s(t._f("datetime")(t.article.lastEdit)))])]),t._v(" "),n("button",{staticClass:"back-fab",on:{click:t.goBack}},[n("svg",{attrs:{width:"24",height:"24",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{d:"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"}})])]),t._v(" "),n("button",{staticClass:"top-fab",on:{click:t.scrollTop}},[n("svg",{attrs:{width:"24",height:"24",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{d:"M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"}})])])]),t._v(" "),n("article",{domProps:{innerHTML:t._s(t.content)}}),t._v(" "),t.article.attachments.length>0?n("aside",{staticClass:"attachments"},[n("h2",[t._v("附件")]),t._v(" "),n("ul",t._l(t.article.attachments,function(e){return n("li",[n("a",{attrs:{href:"http://www1.szu.edu.cn/board/"+e.href}},[t._v(t._s(e.name))])])}),0)]):t._e(),t._v(" "),n("aside",{staticClass:"detail"},[n("h2",[t._v("文章信息")]),t._v(" "),n("ul",[n("li",[t._v("文章标题："+t._s(t.article.title))]),t._v(" "),n("li",[t._v("发文单位："+t._s(t.article.author))]),t._v(" "),n("li",[t._v("发布时间："+t._s(t._f("datetime")(t.article.date)))]),t._v(" "),n("li",[t._v("修改时间："+t._s(t._f("datetime")(t.article.lastEdit)))]),t._v(" "),n("li",[t._v("原文链接："),n("a",{attrs:{href:"http://www1.szu.edu.cn/board/view.asp?id="+t.article._id}},[t._v(t._s("http://www1.szu.edu.cn/board/view.asp?id="+t.article._id))])])])]),t._v(" "),t._m(0)])},staticRenderFns:[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("footer",[r("img",{attrs:{src:n(389)}}),t._v(" "),r("div",[r("div",[t._v("更多权威消息")]),t._v(" "),r("div",[t._v("深大新闻、精彩活动")]),t._v(" "),r("div",[t._v("请关注【深圳大学】")]),t._v(" "),r("div",[t._v("官方微信")])])])}]}},406:function(t,e,n){function r(t){return n(a(t))}function a(t){return i[t]||function(){throw new Error("Cannot find module '"+t+"'.")}()}var i={"./404":154,"./404.vue":154,"./article":155,"./article.vue":155,"./index":156,"./index.vue":156};r.keys=function(){return Object.keys(i)},r.resolve=a,t.exports=r,r.id=406}});