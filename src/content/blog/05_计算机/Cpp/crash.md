---
blog-publish: true
title: "crash"
description: "new c++ int myintptr = new int{ 42 }; delete myintptr; int myintarrayptr = new int[s]; // s could be const or noncons..."
pubDate: 2026-07-06
---

## new

```c++
int* my_int_ptr = new int{ 42 };
delete my_int_ptr;

int* my_int_array_ptr = new int[s]; // s could be const or non-const
delete[] my_int_ptr; 
```
