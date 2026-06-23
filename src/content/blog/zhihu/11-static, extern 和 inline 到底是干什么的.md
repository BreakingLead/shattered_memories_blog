---
title: "static, extern 和 inline 到底是干什么的"
description: "C语言的编译一般是一个文件一个文件的，最后才链接到一起。 C语言又没有命名空间，所以有必要指示这个文件定义的东西别的文件能不能看得到。 static有 两个 用处。给一个标识符（变量名，函数名）内部链接 (internal linkage)。也就是链接后别的文件看不到。…"
pubDate: "2024-04-21"
updatedDate: "2024-04-21"
source: "zhihu"
author: "千秋 Lead"
originalUrl: "https://zhuanlan.zhihu.com/p/693660216"
zhihuId: "693660216"
voteup: 6
---

> 作者：千秋 Lead | 原文：[知乎专栏](https://zhuanlan.zhihu.com/p/693660216)
C语言的编译一般是一个文件一个文件的，最后才链接到一起。

C语言又没有命名空间，所以有必要指示这个文件定义的东西别的文件能不能看得到。

### static

有**两个**用处。

1. 给一个标识符（变量名，函数名）内部链接 (internal linkage)。也就是链接后别的文件看不到。（有点像java的private，只不过针对的是文件）
2. 在函数内，指示它是一个有 静态生存期 的变量，只在最初初始化， 不在栈上 。通俗地说，其实就是一个只允许某个函数看到的全局变量。如下：

```
int

get_id
()

{


static

int

x

=

0
;


x

+=

10
;


return

x
;

}

int

main
(
int

argc
,

const

char

**
argv
)

{


printf
(
"%d"
,

get_id
());

// 10


printf
(
"%d"
,

get_id
());

// 20


printf
(
"%d"
,

get_id
());

// 30


return

0
;

}

// ---------------- 和下面功能上是一样的，但上面的x别的地方不能访问。

int

x

=

0
;

int

get_id
()

{


x

+=

10
;


return

x
;

}

int

main
(
int

argc
,

const

char

**
argv
)

{


printf
(
"%d"
,

get_id
());

// 10


printf
(
"%d"
,

get_id
());

// 20


printf
(
"%d"
,

get_id
());

// 30


return

0
;

}
```

注意：**常量全局变量是自动内部链接的。**

### extern

只有一个用处，就是**给予标识符外部链接（即别的文件看得到）**。

也就是，你可以此处声明，另一个文件定义。

**非常量全局标识是自动外部链接的。**

### inline

inline 现代的唯一用法是**允许多重的相同定义（这样include多次就不会报ODR违规）**，和“内联”没有任何关系。
