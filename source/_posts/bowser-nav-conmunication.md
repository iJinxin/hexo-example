---
title: 浏览器标签通信
tags: note
date: 2018-10-07 15:11:53
---
web开发时常用cookies存储用户登录信息，保证不同标签页信息的同步。但是cookies不能做到响应式触发，不能被动更新数据。如何才能实现浏览器标签之间类似“广播”的通信呢？
<!-- more -->
## 方法一：BroadcastChannel api
[broadcastChannel MDN文档](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel/BroadcastChannel)

使用方法很简单
```
// 发送
const bc = new BroadcastChannel('internal_notification');
bc.postMessage('your message content');
```
```
// 接收
const bc = new BroadcastChannel('internal_notification'); // 发送和接收必须统一
bc.onmessage = function (message) {
    // do something
}
```
这种方式使用简单，但是兼容性不太好，尤其是ie（恩，又是它），完全不支持。

[can i use --- BroadcastChannel兼容性](https://caniuse.com/#search=BroadcastChannel)

## 方法二：localStorage
主要是利用localStorage更变数据时会触发 storage 事件，实现如下
```
// 发送
localStorage('message_topic', yourMessage);

// 接收
$(window).on('storage', message_receive);
const message_receive = function (ev) {
    // 发送的yourMessage 对应 ev.originalEvent.newValue
    console.log(ev.originalEvent.newValue);
}
```
上述只是简单的示范，基本思路如此。还有一些问题需要优化。
1. 因为通信在localStorage中存储了无意义数据，需要去除
1. 系统中若有监听其他storage事件，需要过滤
1. 传输对象时，ev.originalEvent.newValue格式化问题

改进后的代码如下
```
// 发送
const message_send = function (message) {
    localStorage.setItem('tab_message', JSON.stringify(message));
    localStorage.removeItem('tab_message');
}

// 接收
$(window).on('storage', message_receive);
const message_receive = function (ev) {
    // 过滤其他storage事件
    if (ev.orginalEvent.key !== 'tab_message') return;

    // 过滤delete事件
    if (!ev.orgionalEvent.newValue) return;

    const message = JSON.parse(ev.originalEvent.newValue);

    // do something with message
}
```
值得一提的是，在某个浏览器标签中发送消息，目的是为了让其他标签接收到该消息，那它自己是否也需要接收到该消息？BroadcastChannel方式能接收到自己发出的消息，而storage事件却不一定能监听到自己发出的消息。目前已知Firefox不能接收。下文实现全部标签（包括自己）都能接收到消息。

### 完整版实现
```
let isChrome = navigator.userAgent.indexOf("Chrome") > -1;
let isFirefox = navigator.userAgent.indexOf("Firefox") > -1;
// 发送
const message_send = function (message) {
    if (isChrome) {
        const bc = new BroadcastChannel('internal_notification');
        bc.postMessage(message);
    }else {
        localStorage.setItem('tab_message', JSON.stringify(message));
        localStorage.removeItem('tab_message');
        if (isFirefox) {
            // 以火狐浏览器为例
            // 无法接收在自身标签发送的消息的浏览器在此处特殊处理
        }
    }
}

// 接收
const message_receive = function () {
    if (isChrome) {
        const bc = new BroadcastChannel('internal_notification'); // 发送和接收必须统一
        bc.onmessage = function (message) {
            // 需要的内容在message.data下
            console.log(message.data);
        }
    } else {
        $(window).on('storage', messageReceiver);
    }
};

const messageReceiver = function (ev) {
    // 过滤其他storage事件
    if (ev.orginalEvent.key !== 'tab_message') return;

    // 过滤delete事件
    if (!ev.orgionalEvent.newValue) return;

    const message = JSON.parse(ev.originalEvent.newValue);

    console.log(message);
    // do something with message
}
```