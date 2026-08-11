---
blog-publish: true
title: "HoTT 入门"
description: "如果只记一句： HoTT 把等号看成路。 HoTT 是 Homotopy Type Theory，同伦类型论。 HoTT 无需先修同伦论。入门时甚至不需要拓扑。先把“类型—元素—等号”换一种读法就够了。 命题是类型 先从普通类型论开始..."
pubDate: 2026-08-08
---

如果只记一句：

> HoTT 把等号看成路。

HoTT 是 Homotopy Type Theory，同伦类型论。

HoTT 无需先修同伦论。入门时甚至不需要拓扑。先把“类型—元素—等号”换一种读法就够了。

## 命题是类型

先从普通类型论开始。

一个命题 $P$ 是一个类型。一个证明 $p$ 是它的项：

$$
p:P
$$

证明 $P$，就是构造一个 $P$ 的元素。

于是：

- $P\times Q$：同时给出 $P,Q$ 的证明；
- $P+Q$：给出其中一个的证明；
- $P\to Q$：把 $P$ 的证明变成 $Q$ 的证明；
- 空类型：假；
- 单元类型：真。

依值类型只是再往前一步。若 $B$ 依赖 $x:A$，则：

$$
\prod_{x:A}B(x)
$$

表示“对每个 $x$ 给出一个 $B(x)$”；

$$
\sum_{x:A}B(x)
$$

表示“一对 $x:A$ 与 $B(x)$ 的证据”。

不依赖时，它们退化为函数和笛卡尔积。

## 等号也是类型

给定 $a,b:A$，等式

$$
a=_A b
$$

本身也是一个类型。

它的元素 $p:a=b$ 是相等的证明。HoTT 把 $p$ 读成从 $a$ 到 $b$ 的一条路。

最基本的路是：

$$
\operatorname{refl}_a:a=a
$$

于是得到这张表：

| 类型论 | 空间直觉 |
| --- | --- |
| 类型 $A$ | 空间 |
| 项 $a:A$ | 点 |
| 等式 $p:a=b$ | 从 $a$ 到 $b$ 的路 |
| 等式 $\alpha:p=q$ | 两条路之间的变形 |
| 函数 $f:A\to B$ | 保持这些结构的映射 |

而 $p=q$ 仍然是一个类型。它的两个元素之间还可以有等式。一直下去，没有哪一层必须停住。

这就是「高阶」的来源。认真对待等号以后，高阶维度会自己出现。

## 路的归纳法

等号只有一个构造子：$\operatorname{refl}$。

固定 $x:A$。若要构造

$$
\prod_{y:A}\prod_{p:x=y}C(y,p)
$$

只需处理 $C(x,\operatorname{refl}_x)$。

这叫路径归纳，也叫 $J$。

从 $J$ 可以推出：

$$
p^{-1}:b=a
$$

$$
p:a=b,\ q:b=c\quad\Rightarrow\quad p\cdot q:a=c
$$

以及两个更常用的操作。

函数作用在路上：

$$
\operatorname{ap}_f(p):f(a)=f(b)
$$

依值类型沿路搬运元素：

$$
\operatorname{transport}^B(p):B(a)\to B(b)
$$

所以相等既允许替换符号，也携带一个搬运方法。

## 相等与等价

两个类型结构相同，记作：

$$
A\simeq B
$$

从类型的相等可以得到等价：

$$
(A=B)\to(A\simeq B)
$$

单价性公理说，这个函数本身是一个等价：

$$
(A=B)\simeq(A\simeq B)
$$

也就是：类型之间的一条路，等价于类型之间的一种等价。

常见简写是“等价的类型相等”。但不要把它理解成粗暴地抹掉区别。不同的等价可以给出不同的路。例如布尔类型有恒等和取反两种自等价，所以宇宙中也会出现非平凡的环路。

单价性真正解决的是：数学里总说“同构的对象视为相同”，现在这句话可以进入形式系统，并且可以沿这个相同搬运结构。

## 类型不只有集合

HoTT 用等号的复杂度给类型分层。

$$
\operatorname{isContr}(A)
\;:=\;
\sum_{a:A}\prod_{x:A}(a=x)
$$

有一个中心，所有点都等于它：可缩类型。

$$
\operatorname{isProp}(A)
\;:=\;
\prod_{x,y:A}(x=y)
$$

任意两个元素都相等：命题。

$$
\operatorname{isSet}(A)
\;:=\;
\prod_{x,y:A}\operatorname{isProp}(x=y)
$$

任意两点间的路至多一条：集合。

于是有：

$$
\text{可缩类型}\Rightarrow\text{命题}\Rightarrow\text{集合}\Rightarrow\text{1-类型}\Rightarrow\cdots
$$

普通集合没有被丢掉。它只是高阶类型中的第 $0$ 层。

## 直接造一个圆

普通归纳类型用点构造子生成元素。高阶归纳类型还允许路构造子。

圆可以写成：

$$
\operatorname{base}:S^1
$$

$$
\operatorname{loop}:\operatorname{base}=\operatorname{base}
$$

一个点，一条不平凡的自环。够了。

要定义 $f:S^1\to X$，只需给出：

$$
x:X
$$

和

$$
p:x=x
$$

前者是 $\operatorname{base}$ 的像，后者是 $\operatorname{loop}$ 的像。

这就是综合同伦论：直接声明圆由什么点和什么路生成，无需编码成坐标集合。

## 第一次怎么学

按这个顺序：

1. $\Pi$、$\Sigma$、归纳类型；
2. 恒等类型与 $J$；
3. `transport`、`ap`、路的复合；
4. 可缩类型与等价；
5. 单价性；
6. 截断层级；
7. 圆与高阶归纳类型。

单纯集合、模型范畴和 $\infty$-群胚可以留到以后。它们负责解释 HoTT 的模型，使用 HoTT 无需以此为前置知识。

第一遍只检查四件事：

- 能读懂 $\Pi$ 和 $\Sigma$；
- 能用 $J$ 推出 $p^{-1}$；
- 能说清单价性如何保留不同的等价；
- 能用一个点和一条环路定义从 $S^1$ 出发的函数。

做到这些，就已经入门。

## 用什么练习

[Introduction to Homotopy Type Theory](https://arxiv.org/abs/2212.11082) 是更平缓的第一本书。它从依值类型论开始，不要求预先学过类型论或同伦论。

[HoTT Book](https://homotopytypetheory.org/book/) 适合当主参考。先读第 1—4 章，再读第 6—7 章。

若想看到路径真的计算，用 [Cubical Agda](https://agda.readthedocs.io/en/latest/language/cubical.html)。它直接提供路径、可计算的单价性和高阶归纳类型。

Lean 4 可以练依值类型，但内建的 `Eq` 位于 `Prop`。由于证明无关性，两项相等不能有不同的证明。因此它的内建等号不能直接承载 HoTT 的高阶路径结构。见 [Lean 4 的等号说明](https://lean-lang.org/doc/reference/latest/Basic-Propositions/Propositional-Equality/)。

最后压成三句：

> 类型有点，点之间有路，路之间还有路。  
> 等价可以成为相等。  
> 空间可以由点和路直接生成。

相关：[[lean|Lean]]、[[05_计算机/PLT/书|PLT 书单]]
