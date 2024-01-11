+ Promise的状态一经改变就不能再改变。
+ .then和.catch都会返回一个新的Promise。
+ catch不管被连接到哪里，都能捕获上层未捕捉过的错误。
+ 在Promise中，返回任意一个非 promise 的值都会被包裹成 promise 对象，例如return 2会被包装为return Promise.resolve(2)。
+ Promise 的 .then 或者 .catch 可以被调用多次, 但如果Promise内部的状态一经改变，并且有了一个值，那么后续每次调用.then或者.catch的时候都会直接拿到该值。
+ .then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获。
+ .then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环。
+ .then 或者 .catch 的参数期望是函数，传入非函数则会发生值透传。
+ .then方法是能接收两个参数的，第一个是处理成功的函数，第二个是处理失败的函数，再某些时候你可以认为catch是.then第二个参数的简便写法。
+ .finally方法也是返回一个Promise，他在Promise结束的时候，无论结果为resolved还是rejected，都会执行里面的回调函数。

Promise是异步的一种解决方案；

Promise的实例有三种状态：
- pending（进行中）
- Resolved（已完成）
- Rejected（已拒绝）

Promise的实例有两个过程：
- pending -> fulfilled : Resolved（已完成）
- pending -> rejected：Rejected（已拒绝）

**Promise的缺点：**
1. 无法取消Promise，一旦新建它就会立即执行，无法中途取消。
2. 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
3. 当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

**Promise链：**Promise链会接收上一个.then方法返回的结果作为参数传递给下一个.then方法。

Promise有五个常用的方法：then()、catch()、all()、race()、finally()
1. then():then方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数是Promise对象的状态变为rejected时调用。then方法返回的是一个新的Promise实例（不是原来那个Promise实例）
2. catch()：只会捕获Promise的异常，不会捕获同步的异常。
3. all():接收一个数组，数组的每一项都是一个peomise对象，当数组中所有的promise的状态都达到resolved的时候，all方法的状态就会变成resolved，如果有一个状态变成了rejected，那么all方法的状态就会变成rejected。all方法成功的时候返回一个数组，这个数组是按调用顺序保存着结果的
4. race(): 接收一个数组，当最先执行完的事件执行完之后，就直接返回该promise对象的值，如果第一个promise对象状态变成resolved，那自身的状态变成了resolved；反之第一个promise变成rejected，那自身状态就会变成rejected。