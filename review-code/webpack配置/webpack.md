没有webpack之前，都是通过在HTML5文件里面引入一个个Javascript文件来进行开发，这就可能导致并行请求数量过多，存在重复代码的问题；

通过webpack，我们可以使用import、require来进行模块化开发。

在Webpack中一切皆模块，js、css、图片、字体都是模块


#### 工作模式（模式）

| 选项 | 描述 |
| --- | --- |
| development | 开发模式，打包更加快速，省了代码优化步骤|
| production | 生产模式，打包比较慢，会开启 tree-shaking 和 压缩代码|
|none|不使用任何默认优化选项|

#### resolve(解析)
resolve用于设置模块如何解析，常用的配置如下：
- alias：配置别名，简化模块的引入；
- extensions：引入模块时可不带后缀
- symlinks： 用于配置npm link是否生效，禁止可提升编译速度。

#### optimization（优化）
optimization用于自定义webpack的内置优化配置，一般用于生产模式提升性能，常见的配置：
- minimize：是否需要配置bundle；
- minimizer：配置压缩工具，如TerserPlugin、OptimizeCSSAssetsPlugin；
- splitChunks：拆分bundle；
- runtimeChunk：是否需要将所有生成chunk之间共享的运行文件拆分出来。


#### Loader
webpack默认支持处理JS与JSON文件，其他类型如CSS、TypeScript都处理不了，需要借助Loader来处理不同类型的文件。

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

#### SourceMap配置
SourceMap是一种映射关系，当项目运行后，如果出现错误，我们可以利用SourceMap反向定位到源码位置



#### 插件(plugin)
插件则是扩展webpack的能力；
与Loader用于转换特定类型的文件不同，插件（plugin）可以贯穿webpack打包的生命周期，执行不同的任务


#### 优化构建速度

1. 优化 resolve 配置
- alias 用的创建 import 或 require 的别名，用来简化模块引用，项目中基本都需要进行配置。
- extensions
用户引入模块时不带扩展名，会一次从左向右的顺序去尝试解析模块；

注意：
  - 高频文件后缀名放前面
  - 手动配置后，默认配置会被覆盖；
  ```
  const config = {
      //...
      resolve: {
        1: 可以向下面这样全面写出
        extensions: ['.js', '.json', '.wasm'],
        2: 如果想保留默认的配置，可以用...扩展运算符代表默认配置
        extensions: ['.ts', '...'], 
      },
    };
  ```

- modules
告诉webpack解析模块时应该搜索的目录，常见配置如下：
```
  const config = {
  //...
  resolve: {
    优先在src下查找需要解析的文件
      modules: [resolve('src'), 'node_modules'],
    },
  };
```
- symlinks 
如果项目中不使用symlinks，可以设置resolve.symlinks: false，减少解析工作量；
```
module.exports = {
  resolve: {
      symlinks: false,
  },
}

```

4. 缩小返回
在配置loader的时候，我们需要更精确的去指定loader的作用目录或者需要排除的目录，通过使用include和exclude两个配置项；
 - `include`：符合条件的模块进行解析
 - `exclude`：排除符合条件的模块，不解析
 - `exclude`：优先级更高

 5. 多进程配置
 - thread-loader：配置在thread-loader之后的loader都会在单独的worker池中进行；
 ```
  {
    test: /\.js$/i,
    include: resolve('src'),
    exclude: /node_modules/,
    use: [
      {
        loader: 'thread-loader', // 开启多进程打包
        options: {
          worker: 3,
        }
      },
      'babel-loader',
    ]
  },
 ```


6. 利用缓存
通过配置webpack持久化缓存，`cache: filesystem;`，来缓存生成的webpack模块和chunk，改善构建速度。
```
  module.exports = {
    cache: {
      type: 'filesystem', // 使用文件缓存
    },
}

```
- 针对babel-loader开启缓存
```
  {
    test: /\.js$/i,
    include: resolve('src'),
    exclude: /node_modules/,
    use: [
      // ...
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true // 启用缓存
        }
      },
    ]
  }
```

7. 减少loader、plugins
 - 指定include
 为loader指定include，减少loader应用范围，仅应用于最少数量的必要模块；
 ```
  module.exports = {
    rules: [
        {
            test: /\.(js|ts|jsx|tsx)$/,
            include: paths.appSrc,
            use: [
              {
                loader: 'esbuild-loader',
                options: {
                  loader: 'tsx',
                  target: 'es2015',
                },
              }
            ]
         }
    ]
}
 ```
- 管理资源
使用webpack资源模块（asset module）代替旧的assets loader（如file-loader/url-loader等），减少loader配置数量
```
module.exports = {
  rules: [
      {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      include: [
        paths.appSrc,
      ],
      type: 'asset/resource',
    },
  ]
}

```

#### 减少打包体积
1. 压缩CSS
```
npm install -D optimize-css-assets-webpack-plugin

// ...
// 压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// ...

const config = {
  optimization: {
    minimize: true,
    minimizer: [
      // 添加 css 压缩配置
      new OptimizeCssAssetsPlugin({}),
    ]
  },
}
```

2. 压缩JS
> 再生成环境下打包默认会开启js压缩，但当我们手动配置optimization选项之后，就不会在默认对js进行压缩，需要我们手动去配置
因为webpack5内置了terser-webpack-plugin，所有直接饮用配置就行了
```
const TerserPlugin = require('terser-webpack-plugin');

const config = {
  // 用于配置webpack的优化选项
  optimization: {
    minimize: true, // 开启最小化
    // 用于配置代码压缩的插件
    minimizer: [
      // 实力华TerserPlugin插件
      new TerserPlugin({
        // 指定并行压缩的 工作进行数量为4
        parallel: 4,
        // 用于配置Terser的选项
        terserOptions: {
          // 用于指定解析起的选项
          parse: {
            // 指定ECMAScript的版本为8。
            ecma: 8,
          },
          // 用于指定压缩器的选项
          compress: {
            // 指定压缩后的代码要兼容的ECMAScript版本为5
            ecma: 5,
            // 禁用压缩时的警告信息
            warnings: false,
            // 禁用比较操作符的优化
            comparisons: false,
            // 指定内联函数的最大体积，以减小代码体积。
            inline: 2,
          },
          // 用于指定混淆器的选项
          mangle: {
            // 启用Safari 10的兼容性混淆
            safari10: true,
          },
          // 用于指定输出的选项
          output: {
            // 指定输出的代码要兼容的ECMAScript版本为5
            ecma: 5,
            // 禁用输出中的注释
            comments: false,
            // 将输出限制为ASCII字符
            ascii_only: true,
          },
        },
      }),
    ]
  },
  // ...
}
```

3. 清楚无用的CSS
purgecss-webpack-plugin 会单独提取 CSS 并清除用不到的 CSS

```
  module.exports = {
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
          parallel: 4,
        }),
    ],
  }
}
```

4. Three-shaking（摇树）
Three-shaking作用是剔除没有使用的代码，以降低包的体积
- webpack默认是支持的，需要在.bablerc里面设置model: false,即可在生产环境下默认开启
Dead Code 一般具有以下几个特征：
  - 代码不会被执行，不可到达
  - 代码执行的结果不会被用到
  - 代码只会影响死变量（只写不读）
通过 package.json 的 "sideEffects" 属性，来实现这种方式。
```
  {
    "name": "your-project",
    // 模块都没有副作用
    "sideEffects": false
    // 改为数组，添加有副作用的文件路径
    "sideEffects": ["./src/some-side-effectful-file.js"]
  }

```

5. 代码分离
作用：代码分离能够把代码分离到不同的bundle中，然后可以按需加载或者并行加载这些文件。代码分离可以用于获取更小的bundle，以及控制资源加载优先级，可以缩短页面加载时间。

- 抽离重复的代码
SplitChunksPlugin 插件开箱即用，可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk

```
  module.exports = {
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      // 重复打包问题
      cacheGroups:{
        vendors:{ // node_modules里的代码
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          // name: 'vendors', 一定不要定义固定的name
          priority: 10, // 优先级
          enforce: true 
        }
      }
    },
}
```

- css文件分离
MiniCssExtractPlugin 插件将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载

#### 加快加载速度
1. 按需加载
通过webpack提供的import()语法动态导入功能进行代码的分离，通过按需加载，大大提升网页加载速度。
2. CDN配置
3. 浏览器的缓存





