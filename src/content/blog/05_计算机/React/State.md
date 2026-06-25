---
blog-publish: true
title: "State"
description: "React State useState 中的 setXX 并不会立即改变 XX 的值，它只是告诉 React 在下一轮渲染时记住新的值。 js setNumber(n = n + 1); 更新函数 如果新状态依赖旧状态，应使用函数形..."
pubDate: 2026-06-25
---

# React State

`useState` 中的 `setXX` 并不会立即改变 `XX` 的值，它只是告诉 React 在下一轮渲染时记住新的值。

```js
setNumber(n => n + 1);
```

## 更新函数

如果新状态依赖旧状态，应使用函数形式的更新：

```js
setNumber(n => n + 1);   // 安全：基于上一次的 state
setNumber(number + 1);   // 可能取到过期的 state
```

## State 的保留与重置

同一 DOM 位置的同一组件，其 state 会被保留；不同的组件或不同的 DOM 位置，state 独立。

React 通过组件在 UI 树中的位置来判断是否保留 state，而非通过 JSX 标记的写法。
