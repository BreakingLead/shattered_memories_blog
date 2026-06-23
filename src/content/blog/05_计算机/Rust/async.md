---
blog-publish: true
title: "async"
description: "Send 标记 trait 表明实现了 Send 的类型值的所有权可以在线程间传送。 Sync 标记 trait 表明一个实现了 Sync 的类型可以安全的在多个线程中拥有其值的引用。即 &T 是 Send 的。"
pubDate: 2026-06-23
---

`Send` 标记 trait 表明实现了 `Send` 的类型值的所有权可以在线程间传送。

`Sync` 标记 trait 表明一个实现了 `Sync` 的类型可以安全的在多个线程中拥有其值的引用。即 `&T` 是 `Send` 的。
	