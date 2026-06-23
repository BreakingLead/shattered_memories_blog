---
title: "如何给 VSCode 更换UI字体（仅限Windows）"
description: "众所周知 VSCode 有一个将近十年还 Open 的 Issue，就是这个。 https:// github.com/Microsoft/vs code/issues/519 没法改 VSCode 本身的 UI 字体。 但是我最近发现一种方法在 Windows 下可以用。效果如下： 怎么搞呢？ 到 vscode 安装目录 resources\\app\\out"
pubDate: "2024-06-22"
updatedDate: "2024-06-22"
source: "zhihu"
author: "千秋 Lead"
originalUrl: "https://zhuanlan.zhihu.com/p/704866111"
zhihuId: "704866111"
voteup: 8
---

> 作者：千秋 Lead | 原文：[知乎专栏](https://zhuanlan.zhihu.com/p/704866111)
众所周知 VSCode 有一个将近十年还 Open 的 Issue，就是这个。

[https://github.com/Microsoft/vscode/issues/519](https://link.zhihu.com/?target=https%3A//github.com/Microsoft/vscode/issues/519)

没法改 VSCode 本身的 UI 字体。

但是我最近发现一种方法在 Windows 下可以用。效果如下：

![](https://pic3.zhimg.com/v2-777a9304851b0d56b362bf01dae12bd2_r.jpg)

怎么搞呢？

到 vscode 安装目录`resources\app\out\vs\workbench`下，找到 `workbench.desktop.main.css` `workbench.desktop.main.js` 这两个文件，将`Segoe WPC`全文搜索并替换成你想要的字体即可。
