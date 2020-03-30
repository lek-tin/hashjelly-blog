---
title: "Divide Chocolate"
description: "Some description ..."
authors: ["lek-tin"]
tags: ["leetcode", "binary-search", "greedy"]
categories: ["algorithm"]
date: 2020-03-25T01:09:27-07:00
lastmod: 2020-03-25T01:09:27-07:00
draft: true
archive: false
---
You have one chocolate bar that consists of some chunks. Each chunk has its own sweetness given by the array sweetness.  

You want to share the chocolate with your `K` friends so you start cutting the chocolate bar into K+1 pieces using `K` cuts, each piece consists of some **consecutive** chunks.  

Being generous, you will eat the piece with the **minimum total sweetness** and give the other pieces to your friends.  

Find the **maximum total sweetness** of the piece you can get by cutting the chocolate bar optimally.  

### Example 1

```
Input: sweetness = [1,2,3,4,5,6,7,8,9], K = 5
Output: 6
Explanation: You can divide the chocolate to [1,2,3], [4,5], [6], [7], [8], [9]
```

### Example 2

```
Input: sweetness = [5,6,7,8,9,1,2,3,4], K = 8
Output: 1
Explanation: There is only one way to cut the bar into 9 pieces.
```

### Example 3

```
Input: sweetness = [1,2,2,1,2,2,1,2,2], K = 2
Output: 5
Explanation: You can divide the chocolate to [1,2,2], [1,2,2], [1,2,2]
```

#### Constraints

1. `0 <= K < sweetness.length <= 10^4`
2. `1 <= sweetness[i] <= 10^5`

#### Hint

1. After dividing the array into K+1 sub-arrays, you will pick the sub-array with the minimum sum.
2. Divide the sub-array into K+1 sub-arrays such that the minimum sub-array sum is as maximum as possible.
3. Use binary search with greedy check.

### Solution

```python
class Solution:
    def maximizeSweetness(self, sweetness: List[int], K: int) -> int:
        left, right = min(sweetness), sum(sweetness)//(K+1)
        while left <= right:
            mid = left + (right-left)//2
            if not self.check(sweetness, K, mid):
                right = mid-1
            else:
                left = mid+1
        return right

    # greedy search
    def check(sweetness, K, x):
        curr, cuts = 0, 0
        for s in sweetness:
            curr += s
            if curr >= x:
                cuts += 1
                curr = 0
        # return True if such partition is possible
        return cuts >= K+1
```
