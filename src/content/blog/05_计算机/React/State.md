---
blog-publish: true
title: "State"
description: "useState 中的setXX不改变XX而只是让React在下一轮渲染时记住XX是几。 setNumber(n = n + 1); 更新函数 同一DOM位置的同一组件 State 共享"
pubDate: 2026-06-23
---

`useState` 中的`setXX`不改变`XX`而只是让React在下一轮渲染时记住`XX`是几。

```
setNumber(n => n + 1);
```

更新函数

同一DOM位置的同一组件 State 共享