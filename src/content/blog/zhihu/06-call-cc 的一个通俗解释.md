---
title: "call/cc 的一个通俗解释"
description: "太长不看版： call/cc就是一个类似于创建return关键字的东西，这个return关键字可以像一个变量一样被传来传去，在任何地点调用它，都会使返回值出现在call/cc的地点。(define (cps-add a b ret) ( (ret (+ a b)))) (call/cc (λ (ret) ((cps-add 5 10 ret))…"
pubDate: "2024-07-04"
updatedDate: "2024-07-05"
source: "zhihu"
author: "千秋 Lead"
originalUrl: "https://zhuanlan.zhihu.com/p/707070894"
zhihuId: "707070894"
voteup: 2
---

> 作者：千秋 Lead | 原文：[知乎专栏](https://zhuanlan.zhihu.com/p/707070894)
### 太长不看版：

`call/cc`就是一个类似于创建`return`关键字的东西，这个`return`关键字可以像一个变量一样被传来传去，在任何地点调用它，都会使返回值出现在`call/cc`的地点。

```
(
define

(
cps-add

a

b

ret
)

(


(
ret

(
+

a

b
))))

(
call/cc

(
λ

(
ret
)

((
cps-add

5

10

ret
))))
```

### 详细解释

待续
