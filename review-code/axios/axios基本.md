
>Axios 是一个基于 promise 的 HTTP

### 特点
- 从浏览器中创建 XMLHttpRequests
- 从 node.js 创建 http 请求
- 支持 Promise API
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- 自动转换 JSON 数据
- 客户端支持防御 XSRF

### 创建实例
`axios.create([config])`

```
var instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```

### 实例上的一些方法
- axios#request(config)
- axios#get(url[, config])
- axios#delete(url[, config])
- axios#head(url[, config])
- axios#post(url[, data[, config]])
- axios#put(url[, data[, config]])
- axios#patch(url[, data[, config]])


### 配置的默认值/defaults
你可以指定将被用在各个请求的配置默认值

#### 全局的 axios 默认值
```
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

#### 自定义实例默认值
```
// 创建实例时设置配置的默认值
var instance = axios.create({
  baseURL: 'https://api.example.com'
});

// 在实例已创建后修改默认值
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```

#### 配置的优先顺序
配置会以一个优先顺序进行合并。这个顺序是：在 lib/defaults.js 找到的库的默认值，然后是实例的 defaults 属性，最后是请求的 config 参数。后者将优先于前者。
```
// 使用由库提供的配置的默认值来创建实例
// 此时超时配置的默认值是 `0`
var instance = axios.create();

// 覆写库的超时默认值
// 现在，在超时前，所有请求都会等待 2.5 秒
instance.defaults.timeout = 2500;

// 为已知需要花费很长时间的请求覆写超时设置
instance.get('/longRequest', {
  timeout: 5000
});
```


```
import axios from 'axios';

// 设置配置对象
// 基础的一些配置
const configOptions={
  baseURL: 'https://api.example.com',
  timeout:30000, // 超时取消请求
  withCredentials: true, // 表示跨域请求时是否需要使用凭证，默认false
}

// 创建axios的实例
const axiosInstance = axios.create(configOptions);
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

const { get, post, request, put } = axiosInstance;
```