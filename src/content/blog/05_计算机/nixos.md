---
blog-publish: true
title: "nixos"
description: "https://nix.dev/tutorials/nixlanguage.html module 一个简化的 Nixpkgs Module 结构如下： typescript {lib, config, options, pkgs, ..."
pubDate: 2026-07-29
---

https://nix.dev/tutorials/nix-language.html
## module

一个简化的 Nixpkgs Module 结构如下：

```typescript
{lib, config, options, pkgs, ...}:
{
  # 导入其他 Modules
  imports = [
    # ......
    # ./xxx.nix
  ];

  for.bar.enable = true;
  # other options declarations
  # ...
}
```

可以看到它的定义实际是一个 Nix 函数，该函数有 5 个**由模块系统自动生成、自动注入、无需额外声明的参数**：

1. `lib`: **nixpkgs 自带的函数库，提供了许多操作 Nix 表达式的实用函数**
    - 详见 [https://nixos.org/manual/nixpkgs/stable/#id-1.4](https://nixos.org/manual/nixpkgs/stable/#id-1.4)
2. `config`: 包含了当前环境中所有 option 的值，在后面学习模块系统时会大量使用它
3. `options`: 当前环境中所有 Modules 中定义的所有 options 的集合
4. `pkgs`: **一个包含所有 nixpkgs 包的集合，它也提供了许多相关的工具函数**
    - 在入门阶段，你可以暂时把它的默认值理解为 `nixpkgs.legacyPackages.<system>`（其中的 `<system>` 就是你本机的架构，例如 `x86_64-linux`）。也可通过 `nixpkgs.pkgs` 选项来自定义 `pkgs` 的值。
5. `modulesPath`: 一个只在 NixOS 中可用的参数，是一个 Path，指向 [nixpkgs/nixos/modules](https://github.com/NixOS/nixpkgs/tree/nixos-26.05/nixos/modules)
    - 它在 [nixpkgs - modulesPath] 中被定义
    - 通常被用于导入一些额外的 NixOS 模块，NixOS 自动生成的 `hardware-configuration.nix` 中基本都能看到它

---



`import` 函数：求值一个文件中表达式的值。
