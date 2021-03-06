---
title: "Meeting Room"
description: "Some description ..."
authors: ["lek-tin"]
tags: ["leetcode", "greedy-algorithm"]
categories: ["algorithm"]
date: 2019-03-02T12:30:04-08:00
draft: false
archive: false
---
Given an array of meeting time intervals consisting of start and end times `[[s1,e1],[s2,e2],...] (si < ei)`, determine if a person could attend all meetings.

### Example 1
```
Input: [[0,30],[5,10],[15,20]]
Output: false
```
### Example 2
```
Input: [[7,10],[2,4]]
Output: true
```

### Solution
```java
/**
 * Definition for an interval.
 * public class Interval {
 *     int start;
 *     int end;
 *     Interval() { start = 0; end = 0; }
 *     Interval(int s, int e) { start = s; end = e; }
 * }
 */
class Solution {
    public boolean canAttendMeetings(Interval[] intervals) {

        Arrays.sort(intervals, (a, b) -> a.start - b.start);

        for (int i = 0; i < len-1; i++) {
            if (intervals[i].end > intervals[i+1].start) return false;
        }

        return true;
    }
}
```