---
title: "Best Time to Buy and Sell Stock II"
description: "Some description ..."
authors: ["lek-tin"]
tags: ["leetcode", "greedy"]
categories: ["algorithm"]
date: 2018-09-06T23:39:13+08:00
draft: false
archive: false
---

Say you have an array for which the `i`th element is the price of a given stock on day i.

Design an algorithm to find the maximum profit. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times).

Note: You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).

### Example 1

```
Input: [7,1,5,3,6,4]
Output: 7
Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4. Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
```

### Example 2

```
Input: [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4. Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are engaging multiple transactions at the same time. You must sell before buying again.
```

### Example 3

```
Input: [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.
```

### Solution (recursion)

```python
class Solution:
    def maxProfit(self, prices):
        """
        :type prices: List[int]
        :rtype: int
        """
        def makeProfit(priceList, price = None, profit = 0):
            if (len(priceList) == 0):
                return profit
            prevVal = priceList.pop()
            if (price and price > prevVal):
                profit += price - prevVal
            return makeProfit(priceList, prevVal, profit)

        return makeProfit(prices)
```

### Solution (iterative)

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        N = len(prices)
        if N <= 1:
            return 0

        curr = N-1
        localMax = prices[curr]
        curr -= 1
        profit = 0

        while curr >= 0:
            price = prices[curr]
            if price < localMax:
                profit += localMax - price
            localMax = price
            curr -= 1

        return profit
```