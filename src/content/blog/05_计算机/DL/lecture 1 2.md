---
blog-publish: true
title: "lecture 1 2"
description: "SVM 损失 SVM Loss 的计算：将其他类别的得分减去正确类别的得分，加上阈值（margin），再求和。 公式中的 $1$ 是为了扣除本组（正确分类）被多算的那一项——正确类别对自己的 margin 总是 $0$，不应该计入损失..."
pubDate: 2026-07-06
---

## SVM 损失

SVM Loss 的计算：将其他类别的得分减去正确类别的得分，加上阈值（margin），再求和。

![Pasted image 20260622165036](/obsidian-assets/pasted-image-20260622165036.png)

![Pasted image 20260622170228](/obsidian-assets/pasted-image-20260622170228.png)

公式中的 $-1$ 是为了扣除本组（正确分类）被多算的那一项——正确类别对自己的 margin 总是 $0$，不应该计入损失。

## Softmax / Cross Entropy

另一种计算 Loss 的方法。

![Pasted image 20260622203952](/obsidian-assets/pasted-image-20260622203952.png)

$s_{i}$ 是输入经过 $W$ 分类后的原始输出向量，$i$ 是分类编号。$(x_{i},y_{i})$ 是输入样本和真实标签。

$$
L_{i}=-\log P(Y=y_{i}|X=x_{i})=-\log\left(\frac{\exp(s_{y_{i}})}{\sum_{j} \exp(s_{j})}\right)
$$

**KL Divergence** 衡量两个概率分布的差异。

- $P$ 是真实分布（比如一张图 100% 是猫）。
- $Q$ 是模型预测出的分布。
- KL 散度 $D_{KL}(P||Q)$ 表示用 $Q$ 代替 $P$ 所损失的信息量。

![Pasted image 20260622205558](/obsidian-assets/pasted-image-20260622205558.png)

---

![Pasted image 20260622205805](/obsidian-assets/pasted-image-20260622205805.png)

---

![Pasted image 20260622225628](/obsidian-assets/pasted-image-20260622225628.png)

---

## SGD

SGD 只随机选取一小部分样本（mini-batch）来近似计算总 Loss，而不是在全量数据上求梯度。

## SGD + Momentum

在梯度下降中引入动量（历史速度），不再简单地沿当前梯度方向更新，而是结合之前的速度来加速收敛、减少震荡。

![Pasted image 20260622231743](/obsidian-assets/pasted-image-20260622231743.png)

## RMSProp

![Pasted image 20260622234641](/obsidian-assets/pasted-image-20260622234641.png)

---

![Pasted image 20260622234712](/obsidian-assets/pasted-image-20260622234712.png)

---

![Pasted image 20260622234759](/obsidian-assets/pasted-image-20260622234759.png)
