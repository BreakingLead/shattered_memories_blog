---
blog-publish: true
title: "pandas"
description: "https://pandas.ac.cn/docs/gettingstarted/introtutorials/01tableoriented.htmlmintut01tableoriented python df = pd.Data..."
pubDate: 2026-06-23
---

https://pandas.ac.cn/docs/getting_started/intro_tutorials/01_table_oriented.html#min-tut-01-tableoriented



```python
df = pd.DataFrame({"col1":[1,2,3], "col2": ["a","b","c"]})

'''


df2
   col1 col2
0     1    a
1     2    b
2     3    c
'''


```

dtypes

![Pasted image 20260519030847](/obsidian-assets/pasted-image-20260519030847.png)
[`DataFrame.shape`](https://pandas.ac.cn/docs/reference/api/pandas.DataFrame.shape.html#pandas.DataFrame.shape "pandas.DataFrame.shape") 是 pandas `Series` 和 `DataFrame` 的一个属性（记住 [读写教程](https://pandas.ac.cn/docs/getting_started/intro_tutorials/02_read_write.html#min-tut-02-read-write)，属性不要加括号），它包含行数和列数：_(行数, 列数)_。pandas Series 是 1 维的，只返回行数。

選擇多列：`df[["col1","col2"]]` 成一個新的DataFrame

Filter

![Pasted image 20260519031202](/obsidian-assets/pasted-image-20260519031202.png)


`loc,iloc` （可變引用）

```python
df.loc[titanic["Age"] > 35, "Name"]
titanic.iloc[9:25, 2:5] = ...

```


- 使用 `loc` 进行基于标签的选择（使用行/列名称）。 
- 使用 `iloc` 进行基于位置的选择（使用表格位置）。
