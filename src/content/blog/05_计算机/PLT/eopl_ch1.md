---
blog-publish: true
title: "eopl_ch1"
description: "有三種方式定義一個 $S=\\{0,3,6,9,...\\} \\subset \\mathbb{N}$ 的集合 1. 自頂向下，描述哪些元素屬於 $S$，即 $n \\in S \\iff:$ 1. $n=0$ 2. $n3 \\in S$ 2...."
pubDate: 2026-06-23
---

有三種方式定義一個 $S=\{0,3,6,9,...\} \subset \mathbb{N}$ 的集合

1. 自頂向下，描述哪些元素屬於 $S$，即 $n \in S \iff:$
	1. $n=0$
	2. $n-3 \in S$
2. 自底向上，描述推理規則，$S$ 是滿足以下規則的**最小** $\mathbb{N}$ 子集。
	1. $0 \in S$
	2. $\forall n \in S, n+3  \in S$
	3. 為什麼是最小的呢？確保其唯一性。不然我可以在其中加一個1什麼的.
3. 推理規則。這裏不太明白。原文和二完全相同，只是不同記號，但是不用說明最小？
   $$
0 \in S, \dfrac{n \in S}{(n+3) \in S}
	$$
	就夠了，真奇怪。我想應該是指所有S的元素都是由上面的東西導出的。而不是先聲明S是N的子集。

**練習1.1**

![81bfbac27cd6be94ab51dfa2e3e2888d](/obsidian-assets/81bfbac27cd6be94ab51dfa2e3e2888d.jpg)

![74230a7dc5f7ecca93d042aa640886bf_720](/obsidian-assets/74230a7dc5f7ecca93d042aa640886bf_720.jpg)

**練習1.2**

1. $(n,7n+1)$
2. $(n,2^n)$
3. (0,0,1) union n in N+, n,fib\[n-1\],fib\[n\]


