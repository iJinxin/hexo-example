---
title: JavaScript语言精粹
categories: 思考总结
tags: JavaScript readingBook
date: 2018-10-08 10:00:00
---
很早以前就买了《JavaScript语言精粹》这本书，惭愧的是一直没看，最近翻了一遍不禁感慨过去走的一些弯路实在不应该。看书应该作为习惯，作为知识储备，而不是在遇到瓶颈，遇到问题时的解药。<!-- more -->

## 毒瘤-全局变量
全局变量是指在所有作用域中都可见的变量。由于JavaScript的问题不仅仅在于它允许使用全局变量，而且它依赖全局变量，JavaScript没有链接器（linker），所有的编译单元都载入了一个公共的全局对象中。使得程序易冲突，难以维护。

如何避免

- 最小化全局变量，将需要用到的所有全局变量放入一个全局对象中，降低冲突，提升可读性
- 使用闭包进行信隐藏
- 禁用全局变量，每个文件都包裹在自执行函数里

```javascript
const func1 = function (val) {
    var level = 1;
    var step = function () {
         // dosomething
    }
    step();
}

var func2 = (function () {
    var someValue = 1;
    return function () {
        // dosomething
    }
}())
```

```js
<p>123</p>
```



### 对象
JavaScript一切皆对象，且因为原型机制的存在，没有真正意义上的空对象。当你创建一个新对象时，你可以选择某个对象作为它的原型，否则会链接到Object.prototype(标配对象)。因此在使用for-in循环遍历对象时，使用hasOwnPrototype可以只遍历对象自身的属性。

### 数组
JavaScript的基本数据类型不包含数组，数组属于对象，是一种特殊的对象。换句话说，JavaScript没有真正意义上的数组，只有类数组（array-like）特性的对象。它把数组下标转成字符串，并用其作为属性。

判断是否为数组
```
var is_array = function (value) {
      return value && typeof value === 'object' && value.constructor === Array;
    }
    // 但是上述方法在识别从不同的窗口，或帧里构造的数组时会失败。
var is_array = function (value) {
      return Object.prototype.toString.apply(value) === '[object Array]';
    }
```


## 精华
### 函数
函数也是对象，最优秀的对象。它可以像任何其他的值一样被使用。函数可以保存在变量、对象和数组中。函数也可以当做参数传递给其他函数，函数也可以返回函数。而且，正是因为函数也是对象，所以函数也可以拥有方法，而函数与其他对象不同的地方在于它可以被调用。

#### 四种函数调用模式
- 方法调用模式
- 函数调用模式
- 构造器调用模式
- apply调用模式

#### 关于函数返回值
函数总会有返回值。如果没有指定返回值，则返回undefined。如果函数调用时在前面加上了 new 前缀，且返回值不是一个对象，则返回 this

#### function语句对比function表达式
```
function foo () {}

var foo = function () {}
```
function语句在解析时会发生被提升的情况，这意味着不管function被放置在哪里，它都会被移动到被定义时所在的作用域的顶层。这放宽了函数必须先声明后使用的要求，可能会导致混乱
