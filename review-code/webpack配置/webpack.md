#### 工作模式

| 选项 | 描述 |
| --- | --- |
| development | 开发模式，打包更加快速，省了代码优化步骤|
| production | 生产模式，打包比较慢，会开启 tree-shaking 和 压缩代码|
|none|不使用任何默认优化选项|

#### Loader
webpack默认支持处理JS与JSON文件，其他类型都处理不了，需要借助Loader来处理不同类型的文件。

##### css相关的处理
```
安装相应的依赖
npm install postcss postcss-loader postcss-preset-env -D

创建 postcss 配置文件 postcss.config.js
// postcss.config.js
module.exports = {
  plugins: [require('postcss-preset-env')]
}


创建 postcss-preset-env 配置文件 .browserslistrc
# 换行相当于 and
last 2 versions # 回退两个浏览器版本
> 0.5% # 全球超过0.5%人使用的浏览器
IE 10 # 兼容IE 10
```

#### 针对字体、图片的处理

webpack5 新增资源模块(asset module)，允许使用资源文件（字体，图标等）而无需配置额外的 loader。
```
1: 安装相应的依赖
npm install file-loader url-loader


rules: [
  // ...其他规则
  {
    test: /\.(jpe?g|png|gif|svg)$/i,
    type: 'asset',
    parser: {
      dataUrlCondition: {
        maxSize: 8 * 1024 // 小于8KB的图片将被转换为base64编码
      }
    }
  }
]

```

#### 针对JS兼容问题
```
安装相应的依赖：
npm install babel-loader @babel/core @babel/preset-env -D

相应的配置：
rules: [
  {
    test: /\.js$/i,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env'
          ],
        }
      }
    ]
  },
]

新增.babelrc.js文件，配置Babel相应的配置

```



#### 插件(plugin)
与Loader用于转换特定类型的文件不同，插件（plugin）可以贯穿webpack打包的生命周期，执行不同的任务
