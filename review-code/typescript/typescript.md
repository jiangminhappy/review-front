### ts的枚举是什么，怎么用js实现枚举
在TS中，枚举值都有一个与之关联的数字值，默认从0开始自动递增。
```
enum Color {
  RED = 'red',
  GREEN = 'green',
  BLUE = 'blue'
}

console.log(Color.RED); // 输出 "red"


JS模拟枚举
const Color = {
  RED: 'red',
  GREEN: 'green',
  BLUE: 'blue'
};

```