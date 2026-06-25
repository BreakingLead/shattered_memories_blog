---
title: '关于一些图形学的库'
pubDate: 2024-06-30
description: 'OpenGL 等库都是干什么的'
tags: ["programming", "cg"]
---

OpenGL：老牌API，基于状态机。简单易学但是已经不更新了。之后或许会被淘汰。

WebGL：OpenGL 的一个子集的Javascript API。

DirectX：微软的图形学API，只能用于Windows，DX11与12有较大不同，后者更接近底层。

WebGPU：一个很贴近GPU底层的API规范（但是注意不是直接面向底层）。当初设计的时候是想取代WebGL的。照理说是比OpenGL高级的。但是实际上比OpenGL难写多了。注意，虽然它名字带个Web，实际上它也支持原生，有C的API和原生的Rust API。当然支持最好的应该是 Javascript 的。比Vulkan稍稍简单，和Metal差不多。

Wgpu：WebGPU的Rust实现。

Dawn：WebGPU的C++实现。

Vulkan：一个很接近底层的图形学API，全平台通用（不包含Web）。原生是C API，也有C++和Rust的绑定。难学难用。但是或许是未来的趋势。

Metal：苹果的图形学API，不了解不评价。据说比较易学，但也不跨平台。

SDL：是个高级库，有例如drawrect这样的函数，但是因为它是模块化的，它的窗口管理模块常常被拆开拿来用。

GLFW：一个窗口管理库，比SDL更轻量。不能绘图。只是帮你封装了一下系统api而已。原先是为OpenGL设计的，但本身和OpenGL关系不大。也可以给Vulkan之类的用。

GLM：数学库，旨在C++里一比一还原GLSL的语法。我认为不太好用。