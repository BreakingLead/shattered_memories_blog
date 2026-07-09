---
blog-publish: true
title: "trait-assoc-type"
description: "使用泛型时，则不得不在每一个实现中标注类型；这是因为我们也可以实现为 Iterator<String for Counter 使用关联类型后，则无需标注类型，因为不能对同一个类型多次实现该 trait。 add 方法将两个 Point..."
pubDate: 2026-07-06
---

使用泛型时，则不得不在每一个实现中标注类型；这是因为我们也可以实现为 `Iterator<String> for Counter`

使用关联类型后，则无需标注类型，因为不能对同一个类型多次实现该 trait。

`add` 方法将两个 `Point` 实例的 `x` 值和 `y` 值分别相加来创建一个新的 `Point`。`Add` trait 有一个叫做 `Output` 的关联类型，它用来决定 `add` 方法的返回值类型。

这里默认泛型类型位于 `Add` trait 中。这里是其定义：

`trait Add<Rhs=Self> {     type Output;      fn add(self, rhs: Rhs) -> Self::Output; }`

这些代码看来应该很熟悉：一个带有一个方法和一个关联类型的 trait。新增的部分是 `Rhs=Self`：这个语法叫做 **默认类型参数**（_default type parameters_）。`Rhs` 是一个泛型类型参数（“right-hand side” 的缩写），它用于定义 `add` 方法中的 `rhs` 参数。如果实现 `Add` trait 时不指定 `Rhs` 的具体类型，`Rhs` 的类型将默认为 `Self`，即正在实现 `Add` 的类型。

当为 `Point` 实现 `Add` 时，使用了默认的 `Rhs`，因为我们希望将两个 `Point` 实例相加。让我们看看一个实现 `Add` trait 时希望自定义 `Rhs` 类型而不是使用默认类型的例子。