---
blog-publish: true
title: "borrow-asref"
description: "(6 封私信) Rust的Borrow和AsRef：让你的代码用起来像呼吸一样自然 知乎 Borrow：强调逻辑一致的借用 Borrow的功能就像它的名字一样：借用。它需要实现者提供一个borrow方法的实现： rust pub tr..."
pubDate: 2026-07-06
---

[(6 封私信) Rust的Borrow和AsRef：让你的代码用起来像呼吸一样自然 - 知乎](https://zhuanlan.zhihu.com/p/684078465)

## Borrow：强调逻辑一致的借用

`Borrow`的功能就像它的名字一样：借用。它需要实现者提供一个`borrow`方法的实现：

```rust
pub trait Borrow<Borrowed>
where
    Borrowed: ?Sized,
{
    // Required method
    fn borrow(&self) -> &Borrowed;
}
```

Rust 自带 `instance (forall T: type): Borrow<T>`

`Borrow` 要在 `Eq,Ord,Hash` 下同构！这也就是说，如果 `x==y`，那么`x.borrow()==y.borrow()`也一定要成立！



