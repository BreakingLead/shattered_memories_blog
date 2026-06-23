---
blog-publish: true
title: "nushell"
description: "describe 描述类型 echo 只是 return 一行太长可以这样 rust let a = ( \"01/22/2021\" | parse \"{mm}/{dd}/{yy}\"| get year ) 管道 当使用分号时，不会产生..."
pubDate: 2026-06-23
---

`describe` 描述类型

`echo` 只是 return


一行太长可以这样

```rust
let a = (
	"01/22/2021" |
	parse "{mm}/{dd}/{yy}"|
	get year
)
```

# 管道

当使用分号时，不会产生任何输出数据用于管道。因此，紧跟在分号后面的 `$in` 变量将不起作用。
# 表格

- [`select`](https://www.nushell.sh/commands/docs/select.html) - 创建一个只包括指定列的新表；
- [`get`](https://www.nushell.sh/commands/docs/get.html) - 以列表形式返回指定列内的值；

# 通配符

带`*?[...]`的`bare string`被解释为通配符模式