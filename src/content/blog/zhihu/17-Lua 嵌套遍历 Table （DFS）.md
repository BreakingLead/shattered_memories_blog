---
title: "Lua 嵌套遍历 Table （DFS）"
description: "换了输入法，不习惯，上图。。 local content = { A = { a=\"1\", b=\"2\", c = { X=\"3\", Y=\"4\" } }, B = { m=\"5\", n=\"6\" } } local final_key = {} local function dfs(x,tbl) for k, v in pairs(tbl) do if type"
pubDate: "2022-11-29"
updatedDate: "2022-11-29"
source: "zhihu"
author: "千秋 Lead"
originalUrl: "https://zhuanlan.zhihu.com/p/587776184"
zhihuId: "587776184"
voteup: 1
---

> 作者：千秋 Lead | 原文：[知乎专栏](https://zhuanlan.zhihu.com/p/587776184)
换了输入法，不习惯，上图。。

```
local

content

=

{


A

=

{


a
=
"1"
,


b
=
"2"
,


c

=

{


X
=
"3"
,


Y
=
"4"


}


},


B

=

{


m
=
"5"
,


n
=
"6"


}

}

local

final_key

=

{}

local

function

dfs
(
x
,
tbl
)


for

k
,

v

in

pairs
(
tbl
)

do


if

type
(
v
)

==

"string"

or

(
type
(
v
)

==

"table "

and

type
(
v
[
2
])

==

"string"
)
then


final_key
[
x
]
=
k


print
(
table.concat
(
final_key
,
"_"
))


else


final_key
[
x
]
=
k


dfs
(
x
+
1
,
v
)


end


end

end

dfs
(
1
,
content
)

--output:

B_n

B_m

A_b

A_a

A_c_X

A_c_Y
```
