
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';


class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, reject);
    } catch (error) {
      this.reject(error);
    }
  }

  status = PENDING;
  value = null;
  reason = null;
  onFulfilledCallbacks = [];
  onRejectedCallbacks = [];

  static resolve(parameter) {
    if (parameter instanceof MyPromise) {
      return parameter;
    }

    return new MyPromise(resolve => {
      resolve(parameter);
    })
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    })
  }

  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
    }
  }

  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        })
      } else if (this.status === REJECTED) {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        })
      } else if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          })
        })

        this.onRejectedCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          })
        })
      }
    })
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