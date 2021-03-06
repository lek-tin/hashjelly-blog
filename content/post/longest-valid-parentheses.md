---
title: "Longest Valid Parentheses"
description: "Some description ..."
authors: ["lek-tin"]
tags: ["leetcode", "dynamic-programming", "stack"]
categories: ["algorithm"]
date: 2019-11-30T03:24:56-08:00
lastmod: 2019-11-30T03:24:56-08:00
draft: false
archive: false
---
Given a string containing just the characters `'('` and `')'`, find the length of the longest valid (well-formed) parentheses substring.

### Example 1
```
Input: "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()"
```

### Example 2
```
Input: ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()"
```

### Solution
Dynamic programming
```java
// Time: `O(n)`
// Space: `O(n)`
public class Solution {
    public int longestValidParentheses(String s) {
        int maxans = 0;
        // dp array: ith element of dp represents the length of the longest valid substring ending at ith index.
        int dp[] = new int[s.length()];
        for (int i = 1; i < s.length(); i++) {
            // substrings ending with '(' are not valid.
            // So we only care about substrings ending with ')'
            if (s.charAt(i) == ')') {
                // string looks like ".......()"
                if (s.charAt(i - 1) == '(') {
                    dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
                // string looks like ".......))"
                } else if (i - dp[i - 1] > 0 && s.charAt(i - dp[i - 1] - 1) == '(') {
                    dp[i] = dp[i - 1] + ((i - dp[i - 1]) >= 2 ? dp[i - dp[i - 1] - 2] : 0) + 2;
                }
                maxans = Math.max(maxans, dp[i]);
            }
        }
        return maxans;
    }
}
```
Stack
```java
// Time: `O(n)`
// Space: `O(n)`
public class Solution {

    public int longestValidParentheses(String s) {
        int maxans = 0;
        Stack<Integer> stack = new Stack<>();
        stack.push(-1);
        // ")()())"
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '(') {
                stack.push(i);
            } else {
                stack.pop();
                if (stack.empty()) {
                    stack.push(i);
                } else {
                    // stack.peek(): last invalid position.
                    maxans = Math.max(maxans, i - stack.peek());
                }
            }
        }
        return maxans;
    }
}
```
without extra space
```java
// Time: `O(n)`
// Space: O(1)
public class Solution {
    public int longestValidParentheses(String s) {
        int left = 0, right = 0, maxlength = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '(') {
                left++;
            } else {
                right++;
            }
            if (left == right) {
                maxlength = Math.max(maxlength, 2 * right);
            } else if (right > left) {
                left = right = 0;
            }
        }
        left = right = 0;
        for (int i = s.length() - 1; i >= 0; i--) {
            if (s.charAt(i) == '(') {
                left++;
            } else {
                right++;
            }
            if (left == right) {
                maxlength = Math.max(maxlength, 2 * left);
            } else if (left > right) {
                left = right = 0;
            }
        }
        return maxlength;
    }
}
```