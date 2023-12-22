const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 是否开发者模式
// 引入mini-css-extract-plugin 需要判断环境
const devMode = process.env.NODE_ENV !== 'production'

const config = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  devtool: 'source-map',
  // Loader的执行顺序是固定从后往前的
  module: {
    rules: [
      // 关于css的配置
      {
      // test: /\.(s[ac]|c)ss$/i,
      test: /\.css$/,
      use: [
        // MiniCssExtractPlugin.loader,
        // 'style-loader', 
        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        // css的兼容问题
        'postcss-loader',
        // sass-loader
      ]
    },
    // {
    //   test: '/\.(jpe?g|png|gif)$/i',
    //   use: [
    //     {
    //       loader: 'file-loader',
    //     },
    //     {
    //       loader: 'url-loader',
    //       options: {
    //         limit: 50 * 1024
    //       }
    //     }
    //   ]
    // },
    // {
    //   test: /\.(jpe?g|png|gif|svg)$/i,
    //   type: 'asset',
    //   parser: {
    //     dataUrlCondition: {
    //       maxSize: 8 * 1024 // 小于8KB的图片将被转换为base64编码
    //     }
    //   }
    // },
    // {
    //   test: '/\.js$/i',
    //   use: [{
    //     loader: 'babel-loader',
    //     options: {
    //       presets: [
    //         '@babel/preset-env'
    //       ]
    //     }
    //   }]
    // }
  ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  devServer: {
    compress: true,
    port: 9000,
    open: true
  },
}

module.exports = (env, argv) => {
  console.log('argv', argv.mode)
  return config
}


// "browserslist": {
//   "development": [
//     "last 1 chrome version",
//     "last 1 firefox version",
//     "last 1 safari version"
//   ],
//   "production": [
//     "last 1 version",
//     ">0.2%",
//     "not dead",
//     "not op_mini all"
//   ]
// }

