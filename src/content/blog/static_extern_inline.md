---
title: 'C 语言的 static extern 与 inline'
pubDate: 2024-06-30
description: 'C 语言的链接问题'
tags: ["programming", "c"]
---


C语言的编译一般是逐文件的，编译时不知道别的文件有没有定义什么符号。最后才链接到一起。

C语言又没有命名空间，所以有必要指示这个文件定义的东西别的文件能不能使用得到。

## `static`

有两个用处。

给一个标识符（变量名，函数名）内部链接 (internal linkage)。也就是链接后别的文件看不到。（有点像 Java 的 `private` ，只不过针对的是文件）
在函数内，指示它是一个有静态生存期的变量，只在最初初始化，不在栈上。通俗地说，其实就是一个只允许某个函数看到的全局变量。如下：

```c
int get_id() {
    static int x = 0;
    x += 10;
    return x;
}

int main(int argc, const char **argv) {
    printf("%d", get_id()); // 10
    printf("%d", get_id()); // 20
    printf("%d", get_id()); // 30
    return 0;
}

// ---------------- 和下面功能上是一样的，但上面的x别的地方不能访问。

int x = 0;
int get_id() {
    x += 10;
    return x;
}

int main(int argc, const char **argv) {
    printf("%d", get_id()); // 10
    printf("%d", get_id()); // 20
    printf("%d", get_id()); // 30
    return 0;
}
```

注意：**常量全局变量是自动内部链接的**。

## `extern`

只有一个用处，就是给予标识符外部链接（即别的文件看得到）。

也就是，你可以此处声明，另一个文件定义。

非常量全局标识是自动外部链接的。

## `inline`

`inline` 现代的唯一用法是允许多重的相同定义（这样 include 多次就不会报 ODR 违规），和“内联”没有任何关系。