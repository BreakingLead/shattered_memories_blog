---
blog-publish: true
title: "iter"
description: "Rust 迭代器 在 Rust 中，迭代器是惰性的（lazy）——在调用消费性方法之前，迭代器不会做任何实际工作。 rust let v = vec![1, 2, 3]; let iter = v.iter(); // 什么都没发生 ..."
pubDate: 2026-06-25
---

# Rust 迭代器

在 Rust 中，迭代器是**惰性的**（_lazy_）——在调用消费性方法之前，迭代器不会做任何实际工作。

```rust
let v = vec![1, 2, 3];
let iter = v.iter();          // 什么都没发生
let sum: i32 = iter.sum();    // 到这里才真正开始求值
```

三种常见获取方式：
- `iter()` —— 不可变引用迭代
- `iter_mut()` —— 可变引用迭代
- `into_iter()` —— 消费集合，获取所有权

迭代器是 Rust 零开销抽象的代表：编译后通常和手写循环一样快。
