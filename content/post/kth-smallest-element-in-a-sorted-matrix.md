---
title: "Kth Smallest Element in a Sorted Matrix"
description: "Some description ..."
authors: ["lek-tin"]
tags: ["leetcode"]
categories: ["algorithm"]
date: 2019-10-15T23:57:45-07:00
lastmod: 2019-10-15T23:57:45-07:00
draft: false
archive: false
---
Given a `n x n` matrix where each of the rows and columns are sorted in ascending order, find the kth smallest element in the matrix.

Note that it is the `kth` smallest element in the sorted order, not the `kth` distinct element.

### Example:
```
matrix = [
   [ 1,  5,  9],
   [10, 11, 13],
   [12, 13, 15]
],
k = 8,

return 13.
```

#### Note
1. You may assume `k` is always valid, `1 ≤ k ≤ n2`.