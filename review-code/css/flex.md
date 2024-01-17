### flex的理解
Flex是FlexibleBox的缩写，意味“弹性布局”，任何一个容器都可以指定为Flex布局。采用Flex布局的元素，称为Flex容器，它的子元素自动成为容易成员，称为Flex项目。设置Flex布局以后，子元素的float、clear和vertical-align属性将失效。

6个属性设置在容器上：
- flex-direction属性决定主轴的方向（即项目的排列方向）。
- flex-wrap属性定义，如果一条轴线排不下，如何换行。
- flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap；
- justify-content属性定义了项目在主轴上的对齐方式（flex-start、flex-end、center、space-between、space-around）。
- align-items属性定义项目在交叉轴上如何对齐（flex-start、flex-end、center）。
- align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用（flex-start、flex-end、center、space-between、space-around）。

6个属性设置在项目上：
- order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
- flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
- flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
- flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。内容本来的大小(0%)
- flex属性是flex-grow，flex-shrink和flex-basis的简写，默认值为0 1 auto。
- align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch（flex-start、flex-end、center等）。