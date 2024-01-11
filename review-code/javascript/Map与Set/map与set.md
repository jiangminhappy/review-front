#### Map
    Map用来存储键值对结构的数据（key-value）
    - Map和Object的主要区别：
        - Object中的属性名只能是字符串或符号，如果传递了一个其他类型的属性名，JS解释器会自动将其转换为字符串
        - Map中任何类型的值都可以称为数据的key
创建：
    new Map()
属性和方法：
     map.size() 获取map中键值对的数量
     map.set(key, value) 向map中添加键值对
     map.get(key) 根据key获取值
     map.delete(key) 删除指定数据
     map.has(key) 检查map中是否包含指定键
     map.clear() 删除全部的键值对

const map2 = new Map([
                ["name", "猪八戒"],
                ["age", 18],
                [{}, () => {}],
            ])
map.forEach((key1, value)=>{
                console.log('11', key1, value)
            })

Map结构原生提供是三个遍历器生成函数和一个遍历方法
- keys()：返回键名的遍历器。
- values()：返回键值的遍历器。
- entries()：返回所有成员的遍历器。
- forEach()：遍历Map的所有成员。

#### WeakMap
- set(key,value)：设置键名key对应的键值value
- get(key)：该方法读取key对应的键值，如果找不到key，返回undefined。
- has(key)：该方法返回一个布尔值，表示某个键是否在当前Map对象中。
- delete(key)：该方法删除某个键，返回true，如果删除失败，返回false。

WeakMap的键名所引用的对象都是弱引用，即垃圾回收可以直接回收的。


#### Set
   Set用来创建一个集合;它的功能和数组类似，不同点在于Set中不能存储重复的数据
    创建
       - new Set()
       - new Set([...])
    方法
        size 获取数量
        add() 添加元素
        has() 检查元素
        delete() 删除元素

const arr2 = [1,2,3,2,1,3,4,5,4,6,7,7,8,9,10]
const set2 = new Set(arr2)
