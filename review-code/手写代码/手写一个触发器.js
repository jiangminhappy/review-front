/**
 * 手写一个事件触发器，有on/emit/off/once功能
 */

class EventEmitter {
  constructor() {
    this.events = {};
  }

  // 绑定一个事件名和回调函数
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  // 触发指定事件名的所有回调函数，并传入参数
  emit(eventName, ...args) {
    const eventCallbacks = this.events[eventName];
    if (eventCallbacks) {
      eventCallbacks.forEach(callback => {
        callback.apply(null, args)
      })
    }
  }

  // 解除指定事件名和回调函数，从事件的回调函数列表中移除
  off(eventName, callback) {
    const eventCallbacks = this.events[eventName];
    if (eventCallbacks) {
      this.events[eventName] = eventCallbacks.filter(cb => cb !== callback);
    }
  }

  // 绑定一个只会促发一次的事件回调函数，当事件被触发时，回先执行一次回调函数，然后将自身从事件的回调函数列表中移除。
  once(eventName, callback) {
    const onceCallback = (...args) => {
      callback.apply(null, args);
      this.off(eventName, onceCallback)
    }
    this.on(eventName, onceCallback)
  }
}

const emitter = new EventEmitter()
const callback1 = () => {
  console.log('Callback 1');
};

const callback2 = (params) => {
  console.log('Callback 2', params);
};
// emitter.on('event1', callback1);
// emitter.on('event1', callback2);

// emitter.emit('event1');
emitter.once('event2', callback2);
emitter.emit('event2', 111);