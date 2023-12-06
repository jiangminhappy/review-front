#### npm run XXX的原理
当我们运行npm run XXX的时候，就会执行package.json里面的scripts下面对应的命令，比如：
```
"scripts": {
  // cross-env NODE_ENV=dev : 设置环境变量
    "dev": "cross-env NODE_ENV=dev webpack-dev-server --mode development",
    "test": "cross-env NODE_ENV=test webpack --mode production",
    "build": "cross-env NODE_ENV=prod webpack --mode production"
  },
```

如上，相当于执行 `node ./node_modules/.bin/webpack-dev-serve`