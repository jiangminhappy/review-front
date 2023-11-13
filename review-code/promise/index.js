const MyPromise = require('./MyPromise')

const p = MyPromise.resolve().then(() => {
    console.log(0);
    return MyPromise.resolve(4);
})
console.log('p', p)
p.then((res) => {
    console.log('jieguo', res)
})

/**
 * 1: 静态resolve执行，返回promise执行,然后执行then里面的方法
 * 2: 打印出0
 * 3: 返回：静态resolve执行，返回promise执行
*/

