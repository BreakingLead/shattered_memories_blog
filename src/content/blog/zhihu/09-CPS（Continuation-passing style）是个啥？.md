---
title: "CPS（Continuation-passing style）是个啥？"
description: "用是人都能看懂的JS解释下。 这是个普通的加一函数。 function plus_1(x) { let result = x + 1 return result } console.log(plus_1(2)) // 3改成CPS，就是这样的 function plus_1(x, next) { let result = x + 1 // 注意：正统的CPS"
pubDate: "2024-04-23"
updatedDate: "2024-07-04"
source: "zhihu"
author: "千秋 Lead"
originalUrl: "https://zhuanlan.zhihu.com/p/694144709"
zhihuId: "694144709"
voteup: 5
---

> 作者：千秋 Lead | 原文：[知乎专栏](https://zhuanlan.zhihu.com/p/694144709)
用是人都能看懂的JS解释下。

这是个普通的加一函数。

```
function

plus_1
(
x
)

{


let

result

=

x

+

1


return

result

}

console
.
log
(
plus_1
(
2
))

// 3
```

改成CPS，就是这样的

```
function

plus_1
(
x
,

next
)

{


let

result

=

x

+

1


// 注意：正统的CPS这里是没有return的


return

next
(
result
)

}
```

这个`next`就叫`continuation` ，也就是“函数做完事后，接下来要做的事”。很像异步代码中的回调。事实上，CPS就是特殊的回调。

那这是用来干啥的呢？

可以用来延迟计算。我们把它柯里化一下。

```
function

plus_1
(
x
,

next
)

{


return

next
(
x

+

1
)

}

let

currify

=

cps_func

=>

arg

=>

next

=>

cps_func
(
arg
,

next
)

let

id

=

x

=>

x

// 这行之后还不知道答案

let

not_busy_to_get_the_answser

=

currify
(
plus_1
)(
3
)

// 现在才知道

let

answer

=

not_busy_to_get_the_answser
(
id
)

console
.
log
(
answer
)

// 4
```

还可以干啥？可以错误处理。

占坑
