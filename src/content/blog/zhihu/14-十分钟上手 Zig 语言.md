---
title: "十分钟上手 Zig 语言"
description: "Zig 是一门比 C 稍微高级一点，但是又没有 C++ 那么复杂的编程语言，这篇文章将会让你速成 Zig 语言，看完就能写代码。（当然，你得有非GC语言的一点点基础...） 首先，安装 Zig，使用你的包管理器，过程简单，无需赘述。 语言基础新建一个 Zig 工程： zig …"
pubDate: "2024-03-13"
updatedDate: "2024-03-13"
source: "zhihu"
author: "千秋 Lead"
originalUrl: "https://zhuanlan.zhihu.com/p/686755638"
zhihuId: "686755638"
voteup: 153
---

> 作者：千秋 Lead | 原文：[知乎专栏](https://zhuanlan.zhihu.com/p/686755638)
Zig 是一门比 C 稍微高级一点，但是又没有 C++ 那么复杂的编程语言，这篇文章将会让你速成 Zig 语言，看完就能写代码。（当然，你得有非GC语言的一点点基础...）

首先，安装 Zig，使用你的包管理器，过程简单，无需赘述。

## 语言基础

新建一个 Zig 工程：

```
zig init-exe
```

运行 Zig 代码的方式

```
zig run path/to/code.zig
```

示例代码

```
pub

fn

main
()

void

{}

// 注释

// pub 是对其他模块公开，类似 Rust。

// fn 是定义函数的关键字。

// void 是返回类型。

// 因为知乎尚没有 Zig 的语法高亮，先借用 Rust 的。
```

## 变量

可以通过 `var` 和 `const` 来定义变量。`var` 是可变变量。`const`根据语境不同，在函数的作用域下，是不可变变量。在全局作用域下，一般是编译器常量。如果要导入库，请用`@import` 函数，这里的 `@` 没有实际意义，只是可用的函数命名，用来标记内置函数。类型推断是有的，但是像如下的例子，类型标注是必需的。

```
const

std

=

@
import
(
"std"
);

pub

fn

main
()

void

{


var

x
:
i32

=

114514
;

// 类型注释是必需的。


std
.
debug
.
print
(
"x = {}"
,

.{
x
});

// 不要为 .{} 这种语法困惑，这是一个匿名的结构体。

}
```

注意：Rust 中的 变量隐藏（Shadowing）在 Zig 中是不可用的。

变量可以为 `undefined` ，但是使用会报错。

```
const

std

=

@
import
(
"std"
);

pub

fn

main
()

void

{


var

x
:
f64

=

undefined
;


std
.
debug
.
print
(
"{}"
,

.{
x
});

// 报错

}

```

## 函数

函数的定义方式是我们预期所料的。

```
fn

func
()

i32

{


return

42
;

}
```

注意，Zig 不允许有未使用的变量。

```
fn

func
(
x
:
i32
)

i32

{


return

42
;


// 将会报错没有使用 x


// 加上 _ = x 即可，_ 是个垃圾桶变量。

}
```

## 结构体

结构体的定义稍微有些不同于现代语言。

```
const

std

=

@
import
(
"std"
);

const

Vec3

=

struct

{


x
:
f32

=

0.0
,

// 可以设置默认值。


y
:
f32
,


z
:
f32

};

// 分号是必需的。

pub

fn

main
()

void

{


const

vector

=

Vec3
{.
y

=

1.0
,

.
z

=

2.0
}


const

uector
:
Vec3

=

.{.
y

=

1.2
,

.
z

=

2.2
}

}
```

结构体可以具有成员函数，若开头的形参类型是本类型的指针，调用时系统将会自动将自身的指针传参给它。

```
const

Vec3

=

struct

{


x
:
f32

=

0.0
,


y
:
f32
,


z
:
f32
,




fn

display
(
self
:
*
Vec3
)

void

{

// 不一定是self，名称的选择是任意的。


std
.
debug
.
print
(
"x = {}, y = {}, z = {}"
,

.{
self
.
x
,

self
.
y
,

self
.
z
})


// 一层指针的时候，不需要手动解引用，直接用 `.` 即可达成 C 中 `->` 的效果。


// 类似 .{114.5, 14, 191.9} 这样的写法，是一个匿名结构体，变量名是数字，而值是任意的（可以异构）


// 所以它其实类似一个元组。


}

};
```

## 控制流

和我们预期的差不多，不过循环略有不同。

### if

```
const

std

=

@
import
(
"std"
);

pub

fn

main
()

void

{


var

x
:
f32

=

114.514
;


if

(
x

>

0
)

{


std
.
debug
.
print
(
"x is greater than 0"
,

.{});


}

else

{


std
.
debug
.
print
(
"x is lower than or equal to 0"
,

.{});


}

}
```

## for

```
const

std

=

@
import
(
"std"
);

pub

fn

main
()

void

{


const

string

=

[
_
]
u8
{

'a'
,

'b'
,

'c'

};


// 用心去体会语法。


// 括号内的是可迭代对象，bar 内的是被赋的值。


for

(
string
,

0
..)

|
character
,

index
|

{


_

=

character
;


_

=

index
;


}


for

(
string
)

|
character
|

{


_

=

character
;


}


for

(
string
,

0
..)

|
_
,

index
|

{


_

=

index
;


}


for

(
string
)

|
_
|

{}

}
```

## while

是平凡的`while`。并没有什么奇怪的东西。

```
pub

fn

main
()

void

{


var

array

=

[
_
]
i32
{
47
,

48
,

49
};


var

index
:
u32

=

0
;


while

(
index

<

2
)

{


std
.
debug
.
print
(
"value: {}\n"
,

.{
array
[
index
]});


index

+=

1
;


}

}
```

## 数组

定义方式略像 `Go` 。

```
const

std

=

@
import
(
"std"
);

pub

fn

main
()

void

{


var

array
:
[
5
]
u8

=

[
5
]
u8
{
'h'
,

'e'
,

'l'
,

'l'
,

'o'
};


const

brray

=

[
_
]
u32
{
6
,

5
,

4
,

3
,

2
,

1
};


// 可以自行推断长度




_

=

array
[
5
];

// 索引超了，编译期错误。注意索引从 0 开始。


std
.
debug
.
print
(
"{}"
,

.{
brray
.
len
});

// .len 能获取数组长度，Zig 的数组会打包长度的。


// 数组允许有切片。切片只是指针，并没有进行复制。


var

slice
:
[]
u8

=

array
[
0
..
2
];

// 左闭右开。此处类型标注可有可无。


std
.
debug
.
print
(
"{s}\n"
,

.{
slice
});

// `he`


slice
[
1
]

=

'a'
;


std
.
debug
.
print
(
"{s}\n"
,

.{
array
});

// `hallo`

}
```

`const` 的数组能被自动转换成`const`的切片，如下。

```
const

std

=

@
import
(
"std"
);

fn

ret_const_slice
()

[]
const

u8

{


const

str

=

"i am a const array of u8"
;


return

str
;

// 此处发生了强转

}

pub

fn

main
()

void

{


std
.
debug
.
print
(
ret_const_slice
(),

.{});

}
```

## 枚举

没有什么难的。注意枚举也可以有方法，这里就不写了。

```
const

std

=

@
import
(
"std"
);

const

Kind

=

enum

{


TypeA
,


TypeB
,


TypeC
,

};

pub

fn

main
()

void

{


std
.
debug
.
print
(
"A: {}\n"
,

.{
Kind
.
TypeA
});

}
```

## 错误

声明一个错误和枚举很像，不过把`enum`换成了`error`。抛出错误，直接返回就行了，但是函数的返回类型前要加上一个`!`，代表可以是错误。

Zig 中的错误是必须处理的，有两种处理方法：要么不管了，往上传；要么就地处理。

前者用`try` 。 `try`和 `catch | err | {return err}` 是一个意思。~~写Go的不知怎么想~~

后者在 `catch` 中处理。

```
const

std

=

@
import
(
"std"
);

const

SomeError

=

error
{


JiuJiuLiuYiError
,


XingError
,


UghError
,

};

// Zig 一般用这种命名法。

fn

mayError
(
x
:
i32
)

!
i32

{


if

(
x

==

114514

or

x

==

1919810
)

{


return

SomeError
.
UghError
;


}

else

{


return

x

+

1
;


}

}

pub

fn

main
()

!
void

{


// 所有错误必须处理。即使你知道它不会报错也是不行的。


_

=

mayError
(
10
);


// 就地正法


_

=

mayError
(
114514
)

catch

|
e
|

{


std
.
debug
.
print
(
"error: {}"
,

.{
e
});


};


// 让上面的人决定去吧


_

=

try

mayError
(
114514
);


// 当然，如果你喜欢写 Go 的话，用 if 也不是不行。


// | | 中的是返回值，这里赋值运算是没有返回值的。所以语言内置了获取返回值的功能


if

(
mayError
(
114514
))

|
ret_value
|

{


std
.
debug
.
print
(
"returned: {}"
,

.{
ret_value
});


}

else

|
err
|

{


std
.
debug
.
print
(
"failed: {}"
,

.{
err
});


}

}


```

## 指针

非常的简单呐，和C大差不差，唯一区别的就是一层结构体指针不用解引用，和解引用的语法变成了`.*`，指针类型变成了`*type`

```
const

std

=

@
import
(
"std"
);

pub

fn

printer
(
value
:
*
i32
)

void

{


std
.
debug
.
print
(
"pointer: {}\n"
,

.{
value
});


std
.
debug
.
print
(
"value: {}\n"
,

.{
value
.
*
});

}

pub

fn

main
()

void

{


var

value
:
i32

=

42
;


printer
(
&
value
);

}


```

指针可以为空，但是此时它被包含在了一个类似于Haskell的`Maybe`或Rust的`Option<T>`中 ，平常的指针是不为空的。

```
const

std

=

@
import
(
"std"
);

pub

fn

main
()

void

{


var

v
:
i32

=

42
;


var

pv
:
*
i32

=

&
v
;


_

=

pv
;


var

optional_pv
:
*
i32

=

null
;

// 报错


var

optional_pv2
:
?*
i32

=

null
;


_

=

optional_pv
;


_

=

optional_pv2
;

}
```

注意，可能为空的指针要用`.?.*`来解引用。也可以用`if`语句判空。

```
fn

nullChoice
(
value
:
?*
i32
)

void

{


if

(
value
)

|

v

|

{


std
.
debug
.
print
(
"value: {}\n"
,

.{
v
.
*
});


}

else

{


std
.
debug
.
print
(
"null \n"
,

.{});


}

}

```

## 可空类型

和上面的一样，`?Type` 代表Rust中的`Option<Type>`。而`.?`代表Rust中的`.unwrap()`，若为`null`将会运行期报错。

`orelse`关键字可以用于值为`null`时给一个默认值，相当于`.unwrap_or()`。

所以`.?`就是`orelse unreachable`的语法糖。

`unreachable`顾名思义，就是执行了会报错的代码。

```
const

a
:
?
f32

=

5
;

const

b

=

a

orelse

unreachable
;

```

内存管理

首先来介绍`defer`关键字。这个关键字用于推迟后面语句执行的时间直到代码块结束。所以可以用于初始化，先写完初始化语句后面紧接一句销毁。想象一个语句栈，defer就是压栈，到代码块结束的时候逐一出栈然后执行。

```
const

std

=

@
import
(
"std"
);

pub

fn

main
()

void

{


var

a
:
f32

=

1.0
;


{


defer

a

=

a

+

1
;


defer

a

=

a

*

2
;


}


std
.
debug
.
print
(
"{}"
,

.{
a
});


// 3

}
```

可以用`page_allocator`在堆上分配以页为单位的内存（这意味着，即使请求很少内存，它也会分一页，而且请求是通过操作系统分给你的。）

```
const

std

=

@
import
(
"std"
);

pub

fn

main
()

!
void

{


const

allocator

=

std
.
heap
.
page_allocator
;


const

memory

=

try

allocator
.
alloc
(
u8
,

100
);


defer

allocator
.
free
(
memory
);


// memory = ...

}

```

`.alloc()`返回的是数组切片，比较不常用，有个更常用的是  `.create(T)`，可以返回一个指向T的指针。

比起`page_allocator`，更推荐用`GPA`，比较方便

```
const

std

=

@
import
(
"std"
);

pub

fn

main
()

!
void

{


var

gpa

=

std
.
heap
.
GeneralPurposeAllocator
(.{}){};


const

allocator

=

gpa
.
allocator
();


defer

_

=

gpa
.
deinit
();


var

ptr

=

try

allocator
.
alloc
(
u32
,

1
);


defer

allocator
.
free
(
ptr
);


ptr
[
0
]

=

13
;

}
```

## 具名联合体

这个，就是Rust中可以含值的`enum`或者Haskell中的`data`，你可以用`switch`进行匹配。

用`union(enum)`进行声明。

```
const

std

=

@
import
(
"std"
);

// 你要这么写

const

Tagged

=

union
(
enum
)

{

a
:
u8
,

b
:
f32
,

c
:
bool

};

pub

fn

main
()

void

{


var

value

=

Tagged
{

.
b

=

1.5

};


switch

(
value
)

{


.
a

=>

|*
byte
|

byte
.
*

+=

1
,


.
b

=>

|*
float
|

float
.
*

*=

2
,


.
c

=>

|*
b
|

b
.
*

=

!
b
.
*
,


}


std
.
debug
.
print
(
"v = {}\n"
,

.{
value
});


var

value2

=

Tagged
{

.
c

=

true

};


switch

(
value2
)

{


.
a

=>

|*
byte
|

byte
.
*

+=

1
,


.
b

=>

|*
float
|

float
.
*

*=

2
,


.
c

=>

|*
b
|

b
.
*

=

!
b
.
*
,


}


std
.
debug
.
print
(
"v2 = {}\n"
,

.{
value2
});

}


```

差不多没了。可能还有个比较常用的就是ArrayList。

剩下的看文档吧。

[zig.guide](https://link.zhihu.com/?target=https%3A//zig.guide/standard-library/)
