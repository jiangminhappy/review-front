### vue性能优化的方式

vue的编码层面说一些优化手段

1. 路由的懒加载
```
const router = createRouter({
  routes: [
    // 借助webpack的import()实现异步组件
    { path: '/foo', component: () => import('./Foo.vue') }
  ]
})
```

2. keep-alive 缓存页面：避免重复创建组件实例，且保留缓存组件状态
```
<keep-alive>
  <component :is="Component"></component>
 </keep-alive>
```

3. 使用v-show复用DOM：避免重复创建组件

4. 长列表性能优化：如果大数据长列表，可以采取虚拟滚动，只渲染少部分区域的内容

5. 第三方插件按需引入