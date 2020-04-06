---
title: "Report Contiguous Dates"
description: "Some description ..."
authors: ["lek-tin"]
tags: ["leetcode", "sql"]
categories: ["database"]
date: 2020-04-02T16:19:21-07:00
lastmod: 2020-04-02T16:19:21-07:00
draft: false
archive: false
---

Table: `Failed`

```
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| fail_date    | date    |
+--------------+---------+
Primary key for this table is fail_date.
Failed table contains the days of failed tasks.
```

Table: `Succeeded`

```
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| success_date | date    |
+--------------+---------+
Primary key for this table is success_date.
Succeeded table contains the days of succeeded tasks.
```

A system is running one task every day. Every task is independent of the previous tasks. The tasks can fail or succeed.  

Write an SQL query to generate a report of `period_state` for each continuous interval of days in the period from `2019-01-01` to `2019-12-31`.  

`period_state` is 'failed' if tasks in this interval failed or 'succeeded' if tasks in this interval succeeded. Interval of days are retrieved as `start_date` and `end_date`.  

Order result by start_date.  

The query result format is in the following example:  

```
Failed table:
+-------------------+
| fail_date         |
+-------------------+
| 2018-12-28        |
| 2018-12-29        |
| 2019-01-04        |
| 2019-01-05        |
+-------------------+

Succeeded table:
+-------------------+
| success_date      |
+-------------------+
| 2018-12-30        |
| 2018-12-31        |
| 2019-01-01        |
| 2019-01-02        |
| 2019-01-03        |
| 2019-01-06        |
+-------------------+

Result table:
+--------------+--------------+--------------+
| period_state | start_date   | end_date     |
+--------------+--------------+--------------+
| succeeded    | 2019-01-01   | 2019-01-03   |
| failed       | 2019-01-04   | 2019-01-05   |
| succeeded    | 2019-01-06   | 2019-01-06   |
+--------------+--------------+--------------+

The report ignored the system state in 2018 as we care about the system in the period 2019-01-01 to 2019-12-31.
From 2019-01-01 to 2019-01-03 all tasks succeeded and the system state was "succeeded".
From 2019-01-04 to 2019-01-05 all tasks failed and system state was "failed".
From 2019-01-06 to 2019-01-06 all tasks succeeded and system state was "succeeded".
```

### Solution

```sql
SELECT
    state     AS period_state,
    Min(date) AS start_date,
    Max(date) AS end_date
FROM (
    SELECT state,
           date,
           @rank := CASE
                WHEN @prev = state THEN @rank
                ELSE @rank + 1
            END AS rank,
           @prev := state AS prev
    FROM (
        SELECT *
        FROM   (
            SELECT fail_date AS date,
                   "failed"  AS state
            FROM   failed
            UNION ALL
            SELECT success_date AS date,
                   "succeeded"  AS state
            FROM   succeeded
        ) a
        WHERE  date BETWEEN '2019-01-01' AND '2019-12-31'
        ORDER  BY date ASC
    ) b,
    (SELECT @rank := 0,  @prev := "unknown") vars
) d
GROUP  BY d.rank
ORDER  BY start_date ASC
```

or

```sql
SELECT
    state     AS period_state,
    Min(date) AS start_date,
    Max(date) AS end_date
FROM (
    SELECT state,
           date,
           @rank := CASE
                WHEN @prev = state THEN @rank
                ELSE @rank + 1
            END AS rank,
           @prev := state AS prev
    FROM
        (SELECT @rank := 0,  @prev := "unknown") vars,
        (
            SELECT *
            FROM   (
                SELECT fail_date AS date,
                       "failed"  AS state
                FROM   failed
                UNION ALL
                SELECT success_date AS date,
                       "succeeded"  AS state
                FROM   succeeded
            ) a
            WHERE  date BETWEEN '2019-01-01' AND '2019-12-31'
            ORDER  BY date ASC
        ) b
) d
GROUP  BY d.rank
ORDER  BY start_date ASC
```
