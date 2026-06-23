---
title: "CMake 到底怎么用"
description: "占坑。 现代CMake的基础单元叫target， public：本target依赖别的target的头文件，依赖本target的也能用。 private: 本target自己的头文件只有自己能用。 interface: 相当于纯头文件库。"
pubDate: "2024-04-19"
updatedDate: "2024-04-20"
source: "zhihu"
author: "千秋 Lead"
originalUrl: "https://zhuanlan.zhihu.com/p/693337198"
zhihuId: "693337198"
voteup: 7
---

> 作者：千秋 Lead | 原文：[知乎专栏](https://zhuanlan.zhihu.com/p/693337198)
占坑。

现代CMake的基础单元叫target，

public：本target依赖别的target的头文件，依赖本target的也能用。

private: 本target自己的头文件只有自己能用。

interface: 相当于纯头文件库。
