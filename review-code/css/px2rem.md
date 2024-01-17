px2rem 是一种将像素（px）单位转换为根元素字体大小单位（rem）的方法，用于实现响应式布局。

实现px2rem的关键是：通过javascript动态计算根元素的字体大小，并将像素值转换为相对于根元素字体大小的比列
```
function setRem() {
  const baseFontSize = 16; // 基准字体大小，可以根据需要调整
  const designWidth = 375; // 设计稿宽度，可以根据需要调整
  const screenWidth = document.documentElement.clientWidth; // 屏幕宽度

  const rem = (screenWidth / designWidth) * baseFontSize;
  document.documentElement.style.fontSize = rem + 'px';
}

// 页面加载时设置初始的根元素字体大小
window.addEventListener('DOMContentLoaded', setRem);

// 窗口大小变化时重新计算根元素字体大小
window.addEventListener('resize', setRem);

```