### vue-router中如何保护路由？
**概念**：vue-router中保护路由的方法叫做路由守卫，主要通过跳转或取消的方式守卫导航。

路由守卫分为三个级别：全局、路由独享、组件级。影响范围由大到小，例如全局的router.beforeEach()，可以注册一个全局前置守卫，每次路由导航都会经过这个守卫，因此在其内部可以加入控制逻辑决定用户是否可以导航到目标路由；在路由注册的时候可以加入单路由独享的守卫，例如beforeEnter，守卫只在进入路由时触发，因此只会影响这个路由，控制更精确；我们还可以为路由组件添加守卫配置，例如beforeRouteEnter，会在渲染该组件的对应路由被验证前调用，控制的范围更精确了。


### 路由守卫
- 全局前置钩子：beforeEach、beforeResolve、afterEach
- 路由独享守卫：beforeEnter
- 组件内钩子：beforeRouterEnter、beforeRouterUpdate、beforeRouterLeave

### 路由的hash和history模式的区别
hash模式开发中默认的模式，地址栏URL后携带#，后面为路由。
原理是通过onhashchange()事件监听hash值变化，在页面hash值发生变化后，window就可以监听到事件改变，并按照规则加载相应的代码。hash值变化对应的URL都会被记录下来，这样就能实现浏览器历史页面前进后退。

history模式：history模式中URL没有#，这样相对hash模式更好看，但是需要后台配置支持。

history原理是使用HTML5 history提供的pushState、replaceState两个API，用于浏览器记录历史浏览栈，并且在修改URL时不会触发页面刷新和后台数据请求。

### router和route的区别
- $route 是路由信息，包括path、params、query、name等路由信息参数
- $router 是路由实例，包含了路由跳转方法、钩子函数等

### 如何设置动态路由

- params传参

  - 路由配置： /index/:id
  - 路由跳转：this.$router.push({name: 'index', params: {id: "zs"}});
  - 路由参数获取：$route.params.id
  - 最后形成的路由：/index/zs

- query传参

  - 路由配置：/index正常的路由配置
  - 路由跳转：this.$rouetr.push({path: 'index', query:{id: "zs"}});
  - 路由参数获取：$route.query.id
  - 最后形成的路由：/index?id=zs

**区别**

- 获取参数方式不一样，一个通过$route.params，一个通过 $route.query
- 参数的生命周期不一样，query参数在URL地址栏中显示不容易丢失，params参数不会在地址栏显示，刷新后会消失


### 源码的基本实现