---
blog-publish: true
title: "scheme"
description: "论尾递归的114514种写法 scheme (define (sumft from to) (let loop [(acc 0) (i from)] (if (= i (+ 1 to)) acc (loop (+ acc i) (+ ..."
pubDate: 2026-07-06
---

## 论尾递归的114514种写法

```scheme

(define (sum-ft from to)
  (let loop [(acc 0) (i from)]
    (if (= i (+ 1 to))
        acc
        (loop (+ acc i) (+ 1 i)))))

(define (sum-ft2 from to)
  (define helper
    (λ (acc i)
      (if (= i (+ 1 to))
          acc
          (helper (+ acc i) (+ 1 i)))))
  (helper 0 from))

(define (sum-ft3 from to)
  (letrec [(helper
    (λ (acc i)
      (if (= i (+ 1 to))
          acc
          (helper (+ acc i) (+ 1 i)))))]
    (helper 0 from)))
    
(define (sum-ft4 from to)
  (do [(i from (+ i 1)) (acc 0 (+ acc i))]
    [(= i (+ 1 to)) acc]))

```

do的用法

```scheme
(do [(var1 init1 updated1) (...)]) [(return_condition) (return_value)]
```



---


练习1

用递归编写下面的函数。

1. 用于统计表中元素个数的`my-length`函数。（`length`是一个预定义函数）。
2. 一个求和表中元素的函数。
3. 一个分别接受一个表`ls`和一个对象`x`的函数，该函数返回从`ls`中删除`x`后得到的表。
4. 一个分别接受一个表`ls`和一个对象`x`的函数，该函数返回`x`在`ls`中首次出现的位置。索引从`0`开始。如果`x`不在`ls`中，函数返回`#f`。


```scheme
; 1

(define (my-length lst)
  (let loop [(acc 0) (remain lst)]
    (if (null? remain)
        acc
        (loop (+ acc 1) (cdr remain)))))

(define (my-length-nontail lst)
  (if (null? lst)
      0
      (+ 1 (my-length-nontail (cdr lst)))))

; 2
(define (sum lst)
  (let loop [(acc 0) (remain lst)]
    (if (null? remain)
        acc
        (let [(l (car remain)) (r (cdr remain))]
          (loop (+ acc l) r)))))
          
; 3

(define (del-in-ls ls x)
  (if (null? ls)
      '()
      (let [(l (car ls)) (r (cdr ls))]
        (if (eqv? l x)
            (del-in-ls r x)
            (cons l (del-in-ls r x))))))

; 4

(define (find ls x)
  (let loop [(i 0) (remaining ls)]
    (let [(l (car remaining)) (r (cdr remaining))]
      (cond
        [(eqv? l x) i]
        [(null? r) #f]
        [else (loop (+ 1 i) r)]))))


```

练习2

用尾递归编写下面的函数

1. 用于翻转表元素顺序的`my-reverse`函数。（`reverse`函数是预定义函数）
2. 求和由数构成的表。
3. 将一个代表正整数的字符串转化为对应整数。例如，"1232"会被转化为1232。不需要检查不合法的输入。提示，字符到整数的转化是通过将字符#\0……#\9的ASCII减去48，可以使用函数`char->integer`来获得字符的ASCII码。函数`string->list`可以将字符串转化为由字符构成的表。

```scheme
#lang racket

; 1

(define (rev lst)
  (define (rev-helper remain result)
    (if (null? remain)
        result
        (let [(l (car remain))
              (r (cdr remain))]
          (rev-helper r (cons l result)))))
  (rev-helper lst '()))
  
; 2 上已完成

; 3
(define char2int (λ (ch)
                    (- (char->integer ch) 48)))

(define (str2int str)
  (let [(char-list (string->list str))]
    (let loop [(remain char-list) (result 0)]
      (if (null? remain)
          result
          (let* [(l (car remain)) (r (cdr remain)) (n (char2int l))] 
              (loop r (+ (* 10 result) n)))))))


```

练习5

```scheme

(define (rev lst)
  (do [(remain lst (cdr remain))
       (result '() (cons (car remain) result))]
    [(null? remain)
     result]))

(define (sum lst)
  (do [(remain lst (cdr remain   ))
       (acc    0   (+ acc (car remain)))]
    [(null? remain)
     acc]))

(define (str2int str)
  (let [(char2int (λ (ch) (- (char->integer ch) 48)))]
    
    (do [(remain (string->list str) (cdr remain))
         (result 0 (+ (* 10 result) (char2int (car remain))))]
      [(null? remain)
       result])))
```

## High Order Function

```scheme
(map procedure list1 list2 ...)
(for-each) ; 只用于副作用，不是 expression
```



## Lambda

```scheme
(lambda <formals> <body>)
```

关于`<formals>`的写法：

![Pasted image 20260302174926](/obsidian-assets/pasted-image-20260302174926.png)