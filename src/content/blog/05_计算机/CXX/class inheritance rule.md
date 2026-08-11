---
blog-publish: true
title: "class inheritance rule"
description: "cpp cpp class A { public: int x; protected: int y; private: int z; }; class B : public A { // x is public // y is pro..."
pubDate: 2026-07-06
---

#cpp



```cpp
class A 
{
    public:
       int x;
    protected:
       int y;
    private:
       int z;
};

class B : public A
{
    // x is public
    // y is protected
    // z is not accessible from B
};

class C : protected A
{
    // x is protected
    // y is protected
    // z is not accessible from C
};

class D : private A    // 'private' is default for classes
{
    // x is private
    // y is private
    // z is not accessible from D
};
```