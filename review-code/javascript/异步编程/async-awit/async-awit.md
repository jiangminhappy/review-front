> `async/await` 是以更舒适的方式使用 `promise` 的一种特殊语法，同时它也非常易于理解和使用。

### async function
在函数前面的 `async` 这个单词表达了一个简单的事情：即这个函数总是返回一个 `promise`。其它的值将自动被包装在一个 `resolved` 的 `promise` 中。

async函数返回的是一个Promise对象，所以在最外层不能用await回去返回值的情况下，可以使用then()来处理这个Promise对象

```
async function fn() {
	return 1;
}

fn().then(alter)  // 1
```

### await
> 关键字 await 让 JavaScript 引擎等待直到`promise`完成并返回结果。

**await在等什么：**
- 等到的不是Promise对象，那运算结果就是await等到的东西。
- 等到的是一个Promise对象，就需要等着Promise对象resolve得到的值，作为await表达式的运算结果。

``` async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

  let result = await promise; // 等待，直到 promise resolve (*)

  alert(result); // "done!"
}

f();
```

*await 实际上会暂停函数的执行，直到 promise 状态变为 完成，然后以 promise 的结果继续执行。这个行为不会耗费任何 CPU 资源，因为 JavaScript 引擎可以同时处理其他任务：执行其他脚本，处理事件等*

### Error
> 如果一个 promise 正常 resolve，await promise 返回的就是其结果。但是如果 promise 被 reject，它将 throw 这个 error，就像在这一行有一个 throw 语句那样。

```
async function f() {
  await Promise.reject(new Error("Whoops!"));
}
与下面的等价
async function f() {
  throw new Error("Whoops!");
}
```

可以使用`try..catch`来捕获，如果有错误发生，控制权限立马会移交到`catch`块

```
async function f() {

  try {
    let response = await fetch('/no-user-here');
    let user = await response.json();
  } catch(err) {
    // 捕获到 fetch 和 response.json 中的错误
    alert(err);
  }
}

f();
```

### 总结
函数前面的关键字 async 有两个作用：
1. 让这个函数总是返回一个 promise。
2. 允许在该函数内使用 await。

Promise 前的关键字 await 使 JavaScript 引擎等待该 promise 改变状态，然后：
1. 如果有 error，就会抛出异常 —— 就像那里调用了 throw error 一样。
2. 否则，就返回结果。

有了 async/await 之后，我们就几乎不需要使用 promise.then/catch，但是不要忘了它们是基于 promise 的，因为有些时候（例如在最外层作用域）我们不得不使用这些方法。并且，当我们需要同时等待需要任务时，Promise.all 是很好用的。


### async/await对比Promise的优势
- 代码读起来更加同步，Promise虽然摆脱了回调地狱，但是then的链式调⽤也会带来额外的阅读负担
- Promise传递中间值⾮常麻烦，⽽async/await⼏乎是同步的写法，⾮常优雅
- 错误处理友好，async/await可以⽤成熟的try/catch，Promise的错误是catch，如果同步有问题需要用try/catch捕获。