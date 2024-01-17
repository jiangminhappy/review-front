### 是什么
两者都是HTTP协议中发送请求的方法。

- get请求只被用于获取数据
- post将实体提交到指定的资源

### 区别

- get比post更不安全，因为参数是直接暴露在URL上的，所以不能用来传递敏感信息；post是放在请求体的，使用content-type（application/json/application/x-www-form-urlencoded表单/multipart/form-data文件/text/plain纯文本/text/html html文档）指定参数的格式。
- get请求在URL中传递的参数长度是有限制的，而POST没有
- get请求只能进行URL编码（一种将URL中的特殊字符转换为特定格式的编码方式，以便在URL中传输和处理特殊字符），而post支持多种编码（HTML编码、Base64编码、Unicode编码）