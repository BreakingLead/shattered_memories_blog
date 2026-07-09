---
blog-publish: true
title: "Rvalue Reference"
description: "右值引用专门为右值而生，可以指向右值，不能指向左值 std::move() 只将左值提升为一个右值引用，等于 staticcast<T&& lvalue 被声明（有名字的）出来的左、右值引用都是左值。 cpp int a = 1; /..."
pubDate: 2026-07-06
---

右值引用专门为右值而生，**可以指向右值，不能指向左值**

`std::move()` 只将左值提升为一个右值引用，等于 `static_cast<T&&> lvalue`

**被声明（有名字的）出来的左、右值引用都是左值**。

```cpp
int   a = 1; // a is lvalue
int&  a_ref = a; // a_ref is a lvalue reference, which is a lvalue
int&& a_rref = std::move(a); // a_rref is a rvalue reference, which is a lvalue
```

但是，**返回的 `&&` 是右值**。

例子 `std::move()` 返回右值引用，但是 `int&&` 必须指向右值，这咉证了返回的 `&&` 是右值。

```cpp
int&& a_rref = std::move(a);
```

右值引用可以直接指向右值，也可以通过`std::move()`指向左值；而左值引用只能指向左值。

```cpp
void f(const int& n) {
    n += 1; // 编译失败，const左值引用不能修改指向变量
}

void f2(int && n) {
    n += 1; // ok
}

int main() {
    f(5);
    f2(5);
}
```

那么右值引用是为了解决什么呢？是为了方便写“移动”语义，即所有权的转移。

如果不用右值引用，写移动语义是这样的：

```cpp
    // 深拷贝赋值
    Array& operator=(const Array& temp_array) {
        ...
    }
 
    // 移动构造函数，可以浅拷贝
    Array(const Array& temp_array, bool move) {
        data_ = temp_array.data_;
        size_ = temp_array.size_;
        // 为防止temp_array析构时delete data，提前置空其data_      
        temp_array.data_ = nullptr;
    }
```

第一个不方便，由于必须给构造函数签名一个冗余项来重载签名，不美观。
并且，这里若用 `const Array&` 就没法对被移动的对像进行特定的析构操作。
还有，若用 `Array&` 那就没法移动一个右值。

