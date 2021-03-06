---
title: "Min Cost Climbing Stairs"
description: "Some description ..."
authors: ["lek-tin"]
tags: ["leetcode", "dynamic-programming"]
categories: ["algorithm"]
date: 2019-11-20T23:55:40-08:00
lastmod: 2019-11-20T23:55:40-08:00
draft: false
archive: false
---
On a staircase, the `i-th` step has some non-negative cost `cost[i]` assigned (`0 indexed`).

Once you pay the cost, you can either climb one or two steps. You need to find minimum cost to reach the top of the floor, and you can either start from the step with index `0`, or the step with index `1`.

### Example 1
```
Input: cost = [10, 15, 20]
Output: 15
Explanation: Cheapest is start on cost[1], pay that cost and go to the top.
```
### Example 2
```
Input: cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
Output: 6
Explanation: Cheapest is start on cost[0], and only step on 1s, skipping cost[3].
```

#### Note
1. cost will have a length in the range `[2, 1000]`.
2. Every `cost[i]` will be an integer in the range `[0, 999]`.

### Solution
```python
class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        min1 = min2 = 0

        for i in range(len(cost)-1, -1, -1):
            min1, min2 = cost[i] + min(min1, min2), min1

        return min(min1, min2)
```