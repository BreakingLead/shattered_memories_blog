---
blog-publish: true
title: "极坐标系下的v,a,invariance推导"
description: "在平面极坐标中，位置矢量为 $$ \\mathbf r=r\\mathbf er, $$ 其中两个正交单位基矢为 $$ \\begin{aligned} \\mathbf er&=\\mathbf i\\cos\\theta+\\mathbf j\\s..."
pubDate: 2026-07-29
---

![Pasted image 20250511235213](/obsidian-assets/pasted-image-20250511235213.png)

在平面极坐标中，位置矢量为
$$
\mathbf r=r\mathbf e_r,
$$
其中两个正交单位基矢为
$$
\begin{aligned}
\mathbf e_r&=\mathbf i\cos\theta+\mathbf j\sin\theta,\\
\mathbf e_\theta&=-\mathbf i\sin\theta+\mathbf j\cos\theta.
\end{aligned}
$$
它们会随质点的角位置 $\theta(t)$ 转动，因此
$$
\frac{d}{d\theta}\mathbf{e}_{r}=\mathbf{e}_{\theta}
$$
$$
\frac{d}{d\theta}\mathbf{e}_{\theta}=-\mathbf{e}_{r}
$$
$$
\begin{cases}
\dot{\mathbf{e}_{r}}=\dot{\theta}\mathbf{e}_{\theta} \\
\dot{\mathbf{e}_{\theta}}=-\dot{\theta}\mathbf{e}_{r}
\end{cases}
$$

## 速度

$$
\begin{align}
\mathbf{v} &= \frac{d}{dt} (r\mathbf{e}_{r})\\
&=\dot{r}\mathbf{e}_{r}+r \dot{\mathbf{e}_{r}} \\
&=\dot{r}\mathbf{e}_{r}+r\dot{\theta}\mathbf{e}_{\theta}.
\end{align}
$$
若定义标量分量 $v_r,v_\theta$ 使
$$
\mathbf v=v_r\mathbf e_r+v_\theta\mathbf e_\theta,
$$
则
$$
\boxed{v_r=\dot r,\qquad v_\theta=r\dot\theta}.
$$
这里 $\dot\theta$ 是角速度，量纲为 $T^{-1}$；$r\dot\theta$ 才是切向线速度，量纲为 $LT^{-1}$。

## 加速度

$$
\begin{align}
\mathbf{a}&=\frac{d}{dt}\mathbf{v} \\
&=\frac{d}{dt}\left(\dot r\mathbf e_r+r\dot\theta\mathbf e_\theta\right)\\
&=\ddot r\mathbf e_r+\dot r\dot{\mathbf e}_r
 +(\dot r\dot\theta+r\ddot\theta)\mathbf e_\theta
 +r\dot\theta\dot{\mathbf e}_\theta\\
&=(\ddot{r}-r \dot{\theta}^2)\mathbf{e}_{r}
 +(2\dot{r}\dot{\theta}+r \ddot{\theta})\mathbf{e}_{\theta}.
\end{align}
$$
若定义标量分量 $a_r,a_\theta$ 使
$$
\mathbf a=a_r\mathbf e_r+a_\theta\mathbf e_\theta,
$$
则
$$
\boxed{
\begin{aligned}
a_r&=\ddot r-r\dot\theta^2,\\
a_\theta&=2\dot r\dot\theta+r\ddot\theta.
\end{aligned}}
$$
两项加速度的量纲均为 $LT^{-2}$：例如 $r\dot\theta^2$、$\dot r\dot\theta$ 和 $r\ddot\theta$ 都具有该量纲。

## 简单验证

### 匀速圆周运动

令 $r=R$、$\dot r=\ddot r=0$，并令 $\dot\theta=\omega$ 为常数、$\ddot\theta=0$，则
$$
\mathbf v=R\omega\mathbf e_\theta,
\qquad
\mathbf a=-R\omega^2\mathbf e_r.
$$
加速度指向圆心，且其大小为 $R\omega^2=v^2/R$，与向心加速度一致。

### 纯径向运动

令 $\theta=\theta_0$ 为常数，因此 $\dot\theta=\ddot\theta=0$，则
$$
\mathbf v=\dot r\mathbf e_r,
\qquad
\mathbf a=\ddot r\mathbf e_r.
$$
此时 $\mathbf e_r$ 的方向固定，结果退化为沿固定直线的一维运动。
