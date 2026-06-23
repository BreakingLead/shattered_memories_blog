---
blog-publish: true
title: "bash"
description: "BASH echo n no \\n e 转义引号中的特殊 third a && b a success then b a || b a not success then b ext 设置 bash set o noglob set f..."
pubDate: 2026-06-23
---

# BASH

## echo

- `-n` no `\n` 
- `-e` 转义引号中的特殊
- third


`a && b` a success then b

`a || b` a not success then b



## ext


设置
```bash
set -o noglob
set -f

set +o noglob
set +f
```

这个

```bash
echo ~+ # current folder(pwd)
```

`echo ?.txt`

`ls *.txt`

注意，`*` 字符扩展属于文件名扩展，只有文件确实存在的前提下才会扩展。如果文件不存在，就会原样输出。

方括号扩展的形式是[...]，只有文件确实存在的前提下才会扩展。如果文件不存在，就会原样输出。括号之中的任意一个字符。

大括号扩展{...}表示分别扩展成大括号里面的所有值，各个值之间使用逗号分隔。比如，{1,2,3}扩展成1 2 3。

`echo {001..5}`

`echo {a..z}`



用户创建的变量仅可用于当前 Shell，子 Shell 默认读取不到父 Shell 定义的变量。为了把变量传递给子 Shell，需要使用export命令。这样输出的变量，对于子 Shell 来说就是环境变量。`echo a.{,.txt}`

变量扩展

```bash
echo $SHELL
echo ${SHELL}

子命令扩展

```bash
echo $(ls)
echo `ls`
echo $(ls $(pwd))
```


算术

`$((2 + 2))`

单引号用于保留字符的字面含义，各种特殊字符在单引号里面，都会变为普通字符，比如星号（*）、美元符号（$）、反斜杠（\）等。


通配符*是一个特殊字符，放在双引号之中，就变成了普通字符，会原样输出。这一点需要特别留意，这意味着，双引号里面不会进行文件名扩展。

但是，三个特殊字符除外：美元符号（$）、反引号（\`）和反斜杠（\）。这三个字符在双引号之中，依然有特殊含义，会被 Bash 自动扩展。



变量
```bash
a=b 
d=$((1+2))
c="str"
e=$(ls)

```

如果变量的值本身也是变量，可以使用${!varname}的语法，读取最终的值。


```bash
unset a
# ==
a=''
# ==
a=
```




用户创建的变量仅可用于当前 Shell，子 Shell 默认读取不到父 Shell 定义的变量。为了把变量传递给子 Shell，需要使用`export`命令。这样输出的变量，对于子 Shell 来说就是环境变量。
- `$?` 退出码
- `$$` 进程id
- `$!` 为最近一个后台执行的异步命令的进程 ID。
- `$0` shell名/运行脚本名
- `$#`表示脚本的参数数量，`$@`表示脚本的参数值，参见脚本一章。
