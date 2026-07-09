---
blog-publish: true
title: "交叉熵，KL散度"
description: "https://zhuanlan.zhihu.com/p/573385147 概率的倒数可以被称为“惊喜度”，为使确定事件的“惊喜度”为0我们取个对数。 $$ s(x)=\\log \\left( \\frac{1}{p(x)} \\righ..."
pubDate: 2026-07-09
---

https://zhuanlan.zhihu.com/p/573385147


概率的倒数可以被称为“惊喜度”，为使确定事件的“惊喜度”为0我们取个对数。
$$
s(x)=\log \left( \frac{1}{p(x)} \right)=-\log p(x)
$$

这样又可以让有多个独立事件同时发生时，他们产生的惊喜度可以直接相加。

惊喜度，在大部分文章里，都叫做信息量。

信息熵就是这个：

$$
H_{p}(x) = \int s(x)p(x) dx = \int \log\left( \frac{1}{p(x)} \right) p(x) dx
$$
也就是信息量的期望。

如果用事实概率分布（客观）$O(x)$ 去求我们主观认为的概率分布 $S(X)$ 惊喜值的期望：

$$
H_{O,S}=\int \log\left( \frac{1}{S(x)} \right)O(x)dx
$$

这就是交叉熵。我们带着某个主观认知去接触某个客观随机现象的时候，会产生的平均惊喜度。那什么时候交叉熵（也就是我们会获得的平均惊喜度）会大？
比如客观上某件事经常发生，但我们主观上却认为它几乎不可能发生，那么每次它真的发生时，$-\log S(x)$ 都会很大；而客观分布 $O(x)$ 又会让这种事件频繁进入期望计算，所以平均惊喜度，也就是交叉熵，就会变大。

## [相对熵](https://zhida.zhihu.com/search?content_id=215552118&content_type=Article&match_order=1&q=%E7%9B%B8%E5%AF%B9%E7%86%B5&zhida_source=entity) ，Kullback-Leibler Divergence，K-L 散度

交叉熵可以衡量我们基于某种主观认识去感受客观世界时，会产生的平均惊喜。但是根据上面的分析以及数值计算的案例可以看出，即使主观和客观完全匹配 ——这时交叉熵等于信息熵 —— 只要事件仍然随机而非确定，就一定会给我们造成一定程度的惊喜，即不为 0。那我们要怎么度量主观认识和客观之间差异呢？可以用应该用以**当前“世界观”产生的惊喜期望**和完全正确认识事件时产生的惊喜期望的差值来衡量，这个就是相对熵（常称作KL-散度），通常写作：

$$
\begin{align}

D_{KL}(O||S) &= H_{O,S} -H_{O} \\
&=\dots \\
&=\int \log\left( \frac{O(x)}{S(x)} \right)O(x)dx
\end{align}
$$

至于one-hot的离散分类任务只需要 $-\log(x)$ 其中 $x$ 是预测的那一项就行了。因为别的项都是0不参与求和。
