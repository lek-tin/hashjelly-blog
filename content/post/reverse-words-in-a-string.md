---
title: "Reverse Words in a String"
description: "Some description ..."
authors: ["lek-tin"]
tags: ["leetcode", "string"]
categories: ["algorithm"]
date: 2019-10-16T00:04:09-07:00
lastmod: 2020-03-16T00:04:09-07:00
draft: false
archive: false
---
Given an input string, reverse the string word by word.

### Example 1
```
Input: "the sky is blue"
Output: "blue is sky the"
```
### Example 2
```
Input: "  hello world!  "
Output: "world! hello"
```
Explanation: Your reversed string should not contain leading or trailing spaces.
### Example 3
```
Input: "a good   example"
Output: "example good a"
Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.
```

#### Note

1. A word is defined as a sequence of non-space characters.
2. Input string may contain leading or trailing spaces. However, your reversed string should not contain leading or trailing spaces.
3. You need to reduce multiple spaces between two words to a single space in the reversed string.

### Follow up:
1. For C programmers, try to solve it in-place in `O(1)` extra space.

### Solution:
```python
class Solution:
    def reverseWords(self, s: str) -> str:
        s = s.strip()

        i, start, ans = 0, 0, ""
        while i < len(s):
            if s[i] == " " and s[i-1] != " ":
                ans = s[start:i] + " " + ans
            elif s[i] != " " and s[i-1] == " ":
                start = i
            i += 1

        ans = s[start:] + " " + ans

        return ans.strip()
```

### Solution (in-place)

```python
class Solution:
    def reverseWords(self, s: str) -> str:
        self.reverseArray(array)

        start = end = 0

        while end < len(array):
            while start > 0:
                if end < len(array) and array[end] == array[end+1] == " ":
                    end += 1
                else:
                    end += 1
                    break
            start = end
            while end < len(array) and array[end] != " ":
                end += 1

            temp = [ object() for _ in range(10) ]
            temp_1 = temp[:5]
            temp_1[0] = object()

            print(temp[0] == temp_1[0])
            left, right = start, end-1
            while left < right:
                temp = array[right]
                array[right] = array[left]
                array[left] = temp

                left += 1
                right -= 1

    def reverseArray(array):
        left, right = 0, len(array)-1

        while left < right:
            temp = array[right]
            array[right] = array[left]
            array[left] = temp

            left += 1
            right -= 1

        return array
```