---
blog-publish: true
title: "git"
description: "git checkout b = git switch 新建分支并立即切换 git branch xxx create a new branch git branch d delete git checkout b name star..."
pubDate: 2026-07-06
---

`git checkout -b = git switch ` 新建分支并立即切换

`git branch xxx` create a new branch

`git branch -d` delete

`git checkout -b name starting_point` 可以指定从哪里分支

跟踪分支可以自动在`git pull`的时候与上游合并

例：我设置 `master` 的跟踪为 `origin/master` 则 `pull` 时自动抓取上游并合并

想要建立远程的同名跟踪分支：

````console
git checkout --track origin/serverfix
````

或

```bash
git checkout -b sf origin/serverfix
# 自动设置
```

也可以手动

```bash
# now : branch = serverfix
git branch -u origin/serverfix
# -u = --set-upstream-to
```


`git rebase --onto A B C`
```
       First let’s assume your topic is based on branch next. For example, a feature developed
in topic depends on some functionality which is found in next.

               o---o---o---o---o  master
                    \
                     o---o---o---o---o  next
                                      \
                                       o---o---o  topic

       We want to make topic forked from branch master; for example, because the functionality
on which topic depends was merged into the more stable master branch. We want our tree to look
       like this:

               o---o---o---o---o  master
                   |            \
                   |             o'--o'--o'  topic
                    \
                     o---o---o---o---o  next

       We can get this using the following command:

           git rebase --onto master next topic
```


`git log master..dev`

列出所有`master`主线上不在，但`dev`上在的提交

`=git log ^refA refB`

`=git log refB --not refA`

三点选择 `(a || b) - (a and b)`
```bash
$ git log --left-right master...experiment
< F
< E
> D
> C
```



`git stash push --keep-index`

这个是说add的东西可以留在本地，可以运行后把已经add的干净东西提交，烂东西先stash



`reset` 命令会以特定的顺序重写这三棵树，在你指定以下选项时停止：

1. 移动 **HEAD 分支的指向** 即(**HEAD->MAIN**)->1a2b3c 这一堆都移（若指定了 `--soft`，则到此停止）_ 
    
2. 使索引看起来像 HEAD _（若未指定 `--hard`，则到此停止）_ （即撤销git add的效果）
    
3. 使工作目录看起来像 HEAD（即将工作区内容恢复到原来的样子，没改过的样子）


| **命令**                          | **比较对象**              | **适用场景**                          |
| ------------------------------- | --------------------- | --------------------------------- |
| **`git diff`**                  | **工作区** vs **索引**     | 查看你**刚写完但还没 `add`** 的改动。          |
| **`git diff --cached(staged)`** | **索引** vs **最后一次提交**  | 查看你**已经 `add` 但还没 `commit`** 的内容。 |
| **`git diff HEAD`**             | **工作区** vs **最后一次提交** | 查看自上次提交以来，你**所有的**本地修改。           |



# Git中撤销方式

- **git restore**：针对未提交（工作区/暂存区）的后悔操作；
- **git reset**：操作HEAD分支；
- **git revert**：针对已推送到远程的后悔药，通过新增一个相反变更的提交来“撤销”历史。


## `git restore`

把某处的的文件用源替换掉。

某处用`--worktree (-W)`或`--staged (-S)`指定，源用`--source=<tree>/-s <tree>`指定。

源默认是`index`，但指定`--staged`后默认是`HEAD`

故`git restore --staged <file>`和`git reset HEAD <file>`是一样的，因为它们都将index里的文件回复成和HEAD一样的境地了。