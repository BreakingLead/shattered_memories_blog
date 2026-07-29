---
blog-publish: true
title: "lean"
description: "结构体默认值 haskell structure Box where m := 0 def b : Box := {} eval b { m := 0 } 默认值语法 State Monad 本文假定你对 Monad 有了解，只需要知..."
pubDate: 2026-07-29
---

结构体默认值

```haskell
structure Box where
  m := 0


def b : Box := {}
#eval b -- { m := 0 } 默认值语法

```


## State Monad

本文假定你对 Monad 有了解，只需要知道 Option Monad 即可，即 Rust 的 `Option<T>`，Haskell 的 `Maybe a` 等类似物。本文使用的编程语言是 Lean4。但是本文的记号是平凡且可以从字面义理解的，所以你不会用 Lean4 也没关系。

Monad 是一种附加在数据结构上的运算方式（类型类），故我们要理解 State Monad 首先得了解 State 的定义。

State 类型的定义如下（有多种方式，这里挑一种直观的）：

```haskell
def State (σ α : Type) : Type :=
  σ → (α × σ)
-- 也就是
def State σ α := σ → (α × σ)
```

这个 Monad 不同于 Option 等类型，它包装的东西是一个函数而非一个值。这个函数描述了一个计算过程。输入一个状态，可以得到一个新状态和一个输出值的计算过程。

```
  State σ α
  = 一个需要初状态 σ 才能运行的计算
  = 运行后产生结果 α 和新状态 σ
```

不妨举一个具体的例子：取号机。 

机器里保存着下一个号码。当前号码是5执行一次“取号”后
- 顾客拿到号码5
- 机器内部号码变成6

在命令式语言里可能写： 返回 5 同时把内部变量改成 6。
```c
int now_number = 5;
char* take_number() {
	int ret = now_number;
	now_number += 1;
	return f"号码是 ${state}"; // c 没有字符串插值，意会即可
}
```

但纯函数不能偷偷修改外部变量。它只能：
1. 把旧状态作为输入；
2. 把新状态作为输出。

故我们只能写一个这样的函数：

```haskell
def takeNumber (state: Int) : String × Int :=
  (s!"号码是 {state}", state + 1)
-- 注：Lean 中 A × B 代表积类型，也就是一般语言的元组类型。
```

其中返回元组的左边代表这个计算过程的返回值，右边代表状态更新后的值。故 `takeNumber` 函数的类型是 `State String(返回值类型) Int(状态类型) = Int -> (String × Int)
`
现在再来看两个 State 过程的串联过程。

```haskell
-- takeTicket : State Nat String
def takeTicket (state : Nat) : String × Nat :=
  (s!"号码 {state}", state + 1)

-- printTicket : String -> State Nat String
def printTicket (ticket : String) (state : Nat) : String × Nat :=
  (ticket ++ " 已打印", state)

-- program : State Nat String
def program (init: Nat) : String × Nat :=
  let (ret, st) := takeTicket init
  let (ret2, st2) := printTicket ret st
  (ret2, st2)
```

不难发现，`program` 里有一些模板代码可以被提出来成为 Monad 的 Bind 操作的形式。将两个计算过程串联起来形成一个新的计算过程，其中第二个计算过程依赖第一个过程的返回值。

注意到此过程与 `program` 的相似性：

```haskell
def bind (first: State σ α) (update: α → State σ β) : (State σ β) :=
  -- 注意到 State σ β = σ → (β × σ)
  fun old_state =>
    -- 首先跑第一个过程，得到新状态和返回值
    let (return_value, new_state) := first old_state
    -- 用返回值得到下一个计算过程，再用新状态使用这个计算过程得到最终返回值和新状态
    let (fin_return, fin_state) := (update return_value) new_state
    (fin_return, fin_state)

```
