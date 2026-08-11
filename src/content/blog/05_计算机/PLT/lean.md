---
blog-publish: true
title: "lean"
description: "结构体默认值 haskell structure Box where m := 0 def b : Box := {} eval b { m := 0 } 默认值语法"
pubDate: 2026-08-08
---

结构体默认值

```haskell
structure Box where
  m := 0


def b : Box := {}
#eval b -- { m := 0 } 默认值语法

```

