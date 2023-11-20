const PENDING = 'pending';
const FULFILLED = 'pulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error);
    }
  }

  /**
   * 共同的是：执行executor函数
   * 
   * 同步执行：
   *  1: executor执行完毕，会执行resolve或者reject函数（改变状态）
   *  2: 执行then方法，根据状态，执行相应的回调函数
   * 
   * 异步执行：
   *  1: executor执行完毕，会直接执行then里面的方法，根据状态赋值相应的回调函数；
   *  2: 当异步回来的时候，执行resolve或者reject
   *  3: 然后在执行then里面的方法
  */

  status = PENDING;
  value = null;
  reason = null;
  // onFulfilledCallback = null;
  // onRejectedCallback = null;
  onFulfilledCallbacks = [];
  onRejectedCallbacks = [];

  static resolve (parameter) {
    if (parameter instanceof MyPromise) {
      return parameter
    }
    return new MyPromise(resolve => {
      resolve(parameter);
    })
  }

  // reject 静态方法
  static reject (reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

 resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      // this.onFulfilledCallback && this.onFulfilledCallback(value);
      while (this.onFulfilledCallbacks.length) {
        this.onFulfilledCallbacks.shift()(value);
      }
    }
  }
 reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      // this.onRejectedCallback && this.onRejectedCallback(reason);
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason);
      }
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        // 创建一个微任务
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.status === REJECTED) {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise, x, resolve, reject);
            } catch(error) {
              reject(error);
            }
          })
        });
        this.onRejectedCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          })
        });
      }
    })

    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if (x instanceof MyPromise) {
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}

module.exports = MyPromise;