---
blog-publish: true
title: "Hessian Matrix & SVD 分解"
description: "梯度告诉你往哪边走。 Hessian 告诉你每个方向弯得多厉害。 SVD 把一个线性映射拆成：正交变换、沿坐标轴伸缩、再做一次正交变换。 Hessian 描述函数的局部形状。SVD 描述矩阵怎样变形空间。二者在最小二乘中接到一起。 H..."
pubDate: 2026-07-29
---

梯度告诉你往哪边走。

Hessian 告诉你每个方向弯得多厉害。

SVD 把一个线性映射拆成：正交变换、沿坐标轴伸缩、再做一次正交变换。

Hessian 描述函数的局部形状。SVD 描述矩阵怎样变形空间。二者在最小二乘中接到一起。

## Hessian

设

$$
f:\mathbb R^n\to\mathbb R
$$

梯度收集一阶偏导：

$$
\nabla f(x)=
\begin{bmatrix}
\frac{\partial f}{\partial x_1}\\
\vdots\\
\frac{\partial f}{\partial x_n}
\end{bmatrix}
$$

Hessian 收集二阶偏导：

$$
H_f(x)=
\begin{bmatrix}
\frac{\partial^2f}{\partial x_1^2}&\cdots&\frac{\partial^2f}{\partial x_1\partial x_n}\\
\vdots&\ddots&\vdots\\
\frac{\partial^2f}{\partial x_n\partial x_1}&\cdots&\frac{\partial^2f}{\partial x_n^2}
\end{bmatrix}
$$

若二阶偏导连续，混合偏导可交换，所以

$$
H_f(x)=H_f(x)^T
$$

Hessian 是实对称矩阵。

## Hessian 就是局部曲率

在 $x$ 附近走一小步 $\Delta x$：

$$
f(x+\Delta x)
\approx
f(x)+\nabla f(x)^T\Delta x
+\frac12\Delta x^TH_f(x)\Delta x
$$

三项分别是：原高度、斜率、弯曲。

沿单位方向 $v$ 的二阶变化为：

$$
v^TH_f(x)v
$$

它大于 $0$，这个方向向上弯；小于 $0$，这个方向向下弯；接近 $0$，这个方向很平。

在驻点 $\nabla f(x)=0$ 处，Hessian 的符号决定局部形状。

## 把曲率轴找出来

实对称矩阵可以正交对角化：

$$
H=Q\Lambda Q^T
$$

$Q$ 的列向量 $q_i$ 是特征向量，$\Lambda$ 的对角元 $\lambda_i$ 是特征值。

令

$$
\Delta x=Qz
$$

则二次项变成：

$$
\Delta x^TH\Delta x
=z^T\Lambda z
=\sum_i\lambda_i z_i^2
$$

原坐标中混在一起的曲率，被 $Q$ 转到了各自独立的主轴上。

于是驻点分类很直接：

- 所有 $\lambda_i>0$：严格局部极小值；
- 所有 $\lambda_i<0$：严格局部极大值；
- 有正有负：鞍点；
- 出现 $0$ 且其余同号：二阶信息不够。

最后一种需要继续看更高阶项。

## SVD

任意矩阵

$$
A\in\mathbb R^{m\times n}
$$

都可以分解为：

$$
A=U\Sigma V^T
$$

从右往左读：

1. $V^T$ 对输入空间做正交变换；
2. $\Sigma$ 沿坐标轴伸缩；
3. $U$ 对输出空间做正交变换。

正交变换包括旋转和翻转，不改变长度与夹角。

$V$ 的列向量叫右奇异向量，给出输入方向。

$U$ 的列向量叫左奇异向量，给出这些方向变换后的输出方向。

$\Sigma$ 的对角元

$$
\sigma_1\ge\sigma_2\ge\cdots\ge0
$$

叫奇异值，给出各方向的伸缩倍数。

零奇异值对应被压扁的方向。非零奇异值的数量就是矩阵的秩。

## 奇异值从哪里来

由 SVD：

$$
\begin{align}
A^TA
&=(U\Sigma V^T)^T(U\Sigma V^T)\\
&=V\Sigma^T\Sigma V^T
\end{align}
$$

所以 $A^TA$ 的特征向量是 $A$ 的右奇异向量，特征值是奇异值的平方：

$$
\lambda_i(A^TA)=\sigma_i(A)^2
$$

同理：

$$
AA^T=U\Sigma\Sigma^TU^T
$$

$AA^T$ 给出左奇异向量。

这也是一种计算 SVD 的思路。不过数值计算通常直接对 $A$ 做 SVD。显式形成 $A^TA$ 会平方条件数，也会放大数值误差。

## Hessian 与 SVD 的关系

Hessian 是对称方阵，所以优先使用特征分解：

$$
H=Q\Lambda Q^T
$$

它当然也有 SVD。令

$$
|\Lambda|=\operatorname{diag}(|\lambda_1|,\ldots,|\lambda_n|)
$$

令

$$
s_i=
\begin{cases}
1,&\lambda_i\ge0\\
-1,&\lambda_i<0
\end{cases}
,\qquad
S=\operatorname{diag}(s_1,\ldots,s_n)
$$

则

$$
H=(QS)|\Lambda|Q^T
$$

这就是 Hessian 的一个 SVD。故：

$$
\sigma_i(H)=|\lambda_i(H)|
$$

Hessian 的奇异值给出曲率强度，它的特征值还给出曲率方向的正负。判断极小值、极大值和鞍点时，需要看特征值的符号。

例如：

$$
f(x,y)=\frac32x^2-\frac12y^2
$$

它的 Hessian 为：

$$
H=
\begin{bmatrix}
3&0\\
0&-1
\end{bmatrix}
$$

特征值是 $3,-1$，所以原点是鞍点。

奇异值是 $3,1$。只看奇异值会漏掉向下弯的符号。

## 二者在最小二乘中相遇

设损失函数为：

$$
L(\theta)=\frac12\|A\theta-b\|_2^2
$$

则

$$
\nabla L(\theta)=A^T(A\theta-b)
$$

$$
H_L=A^TA
$$

再代入 $A=U\Sigma V^T$：

$$
H_L=V\Sigma^T\Sigma V^T
$$

这句话很重要：

> 数据矩阵 $A$ 的右奇异向量，就是损失函数的主曲率方向；奇异值的平方，就是这些方向上的曲率。

于是：

- $\sigma_i$ 大：该方向很陡；
- $\sigma_i$ 小：该方向很平；
- $\sigma_i=0$：该方向完全不影响损失，参数无法由数据唯一确定。

若 $A$ 满列秩，则：

$$
\kappa(H_L)
=\frac{\sigma_{\max}^2}{\sigma_{\min}^2}
=\kappa(A)^2
$$

最小二乘的 Hessian 会把原矩阵的条件数平方。这解释了病态数据为什么让优化变慢、数值误差变大。

## 梯度下降为什么会被曲率拖慢

对二次损失做梯度下降：

$$
\theta_{t+1}
=\theta_t-\eta A^T(A\theta_t-b)
$$

取一个最小二乘解 $\theta^*$，令

$$
e_t=\theta_t-\theta^*,\qquad z_t=V^Te_t
$$

换到右奇异向量坐标后，每个误差方向独立更新：

$$
z_{t+1,i}=(1-\eta\sigma_i^2)z_{t,i}
$$

稳定步长需要满足：

$$
0<\eta<\frac{2}{\sigma_{\max}^2}
$$

最大的奇异值限制步长，最小的非零奇异值决定最慢方向。两者相差很大时，只能用小步长慢慢走过平坦方向。

加入 $L_2$ 正则化：

$$
L_\lambda(\theta)
=\frac12\|A\theta-b\|^2
+\frac\lambda2\|\theta\|^2
$$

Hessian 变为：

$$
H_{L_\lambda}=A^TA+\lambda I
$$

每个方向的曲率从 $\sigma_i^2$ 变成 $\sigma_i^2+\lambda$。原来的平坦方向被抬起来，问题更稳定。

## 怎么选

| 想知道什么 | 看什么 |
| --- | --- |
| 函数在驻点附近是极小、极大还是鞍点 | Hessian 的特征值 |
| 矩阵在哪些方向伸缩最强 | SVD |
| 最小二乘的主曲率方向 | $A$ 的右奇异向量 |
| 最小二乘的曲率大小 | $\sigma_i(A)^2$ |
| 高维模型的局部曲率 | Hessian-vector product 与特征值算法 |

高维问题里，完整 Hessian 可能大到无法存储。实际常计算 $Hv$，再用幂迭代或 Lanczos 方法估计最大的几个特征值。

最后压缩：

> 梯度是一阶斜率。
>
> Hessian 是带符号的二阶曲率。
>
> SVD 是线性映射的主轴与伸缩。
>
> 最小二乘里，$H=A^TA$，所以曲率等于奇异值的平方。

相关：[[07_数学/一元线性回归方程推导|一元线性回归方程推导]]
