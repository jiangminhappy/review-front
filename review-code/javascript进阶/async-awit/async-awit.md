> `async/await` 是以更舒适的方式使用 `promise` 的一种特殊语法，同时它也非常易于理解和使用。

### async function
在函数前面的 `async` 这个单词表达了一个简单的事情：即这个函数总是返回一个 `promise`。其他值将自动被包装在一个 `resolved` 的 `promise` 中。

```
async function fn() {
	return 1;
}

fn().then(alter)  // 1
```

### await
> 关键字 await 让 JavaScript 引擎等待直到`promise`完成并返回结果。
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