---
layout: post
title: "[BOJ #9466] 텀 프로젝트 Python3"
category: algorithm
author: jihak
create_date: "2023-08-18"
preview: "텀 프로젝트: 그래프 탐색 문제"
image_url: "https://user-images.githubusercontent.com/48908552/261535873-19ca255a-e6e8-434d-80ea-ab1f3635e5d3.png"
---

### 링크

<a href= "https://www.acmicpc.net/problem/9466">https://www.acmicpc.net/problem/9466</a>

<br>

### 문제

이번 가을학기에 '문제 해결' 강의를 신청한 학생들은 텀 프로젝트를 수행해야 한다. 프로젝트 팀원 수에는 제한이 없다. 심지어 모든 학생들이 동일한 팀의 팀원인 경우와 같이 한 팀만 있을 수도 있다. 프로젝트 팀을 구성하기 위해, 모든 학생들은 프로젝트를 함께하고 싶은 학생을 선택해야 한다. (단, 단 한 명만 선택할 수 있다.) 혼자 하고 싶어하는 학생은 자기 자신을 선택하는 것도 가능하다.

학생들이(s1, s2, ..., sr)이라 할 때, r=1이고 s1이 s1을 선택하는 경우나, s1이 s2를 선택하고, s2가 s3를 선택하고,..., sr-1이 sr을 선택하고, sr이 s1을 선택하는 경우에만 한 팀이 될 수 있다.

예를 들어, 한 반에 7명의 학생이 있다고 하자. 학생들을 1번부터 7번으로 표현할 때, 선택의 결과는 다음과 같다.

1	2	3	4	5	6	7
3	1	3	7	3	4	6
위의 결과를 통해 (3)과 (4, 7, 6)이 팀을 이룰 수 있다. 1, 2, 5는 어느 팀에도 속하지 않는다.

주어진 선택의 결과를 보고 어느 프로젝트 팀에도 속하지 않는 학생들의 수를 계산하는 프로그램을 작성하라.

<br>

### 입력

첫째 줄에 테스트 케이스의 개수 T가 주어진다. 각 테스트 케이스의 첫 줄에는 학생의 수가 정수 n (2 ≤ n ≤ 100,000)으로 주어진다. 각 테스트 케이스의 둘째 줄에는 선택된 학생들의 번호가 주어진다. (모든 학생들은 1부터 n까지 번호가 부여된다.)

<br>

### 출력

각 테스트 케이스마다 한 줄에 출력하고, 각 줄에는 프로젝트 팀에 속하지 못한 학생들의 수를 나타내면 된다.
<br>

### 예제 입력

<img src = "https://user-images.githubusercontent.com/48908552/261535662-17bebf94-6c96-4b6f-b1c2-c9e628de5954.png" alt ="예제입력">

### 풀이



```python

# 출처: ICPC > Regionals > Asia Pacific > Korea > Asia Regional - Daejeon 2013 L번
# 알고리즘 분류: 그래프 이론, 그래프 탐색, 깊이 우선 탐색

import sys

sys.setrecursionlimit(10 ** 6)
input = sys.stdin.readline
def dfs(n):
    global count

    visited[n] = True
    cycle.append(n)

    if visited[d[n]] == True:
        if d[n] in cycle:
            count-=len(cycle)-cycle.index(d[n]) 
        return

    else:
        dfs(d[n])


t = int(input())
for _ in range(t):
    n = int(input())
    arr = list(map(int, input().split()))
    d = {}
    visited = [False]*(n+1)
    for i, x in enumerate(arr):
        d[i+1] = x
    count = n
    for k in d.keys():
        if visited[k] == False:
            cycle = []
            dfs(k)
    print(count)

```

cycle을 찾아주는 문제이다. 
위의 예시를 보아 처음부터 순회한다고 하면   
1 3 3 -->  3    
2 1 3 3 --> 3   
4 7 6 4 --> 4 7 6  
5 3 3 --> 3   
6 4 7 6 --> 6 4 7   
7 6 4 7 --> 7 6 4   

이런식으로 cycle이 생성되게 된다.   
하지만 모든 것을 이런식으로 확인을 다 할 필요는 없고     
visited를 둬서 방문여부를 확인해서 방문하지 않은 것만 cycle을 확인해주면 된다.

먼저 input값을 받아준 뒤에 dictionary를 이용해 초기화를 해주었다.   

cycle을 확인하는 것이니 깊이 탐색을 이용해준다.   
```python 
count-=len(cycle)-cycle.index(d[n]) 
```
이 부분은 index를 찾아준 뒤 cycle이 생기는 부분만의 길이를 얻은 뒤 거기서 정답을 구하기 위해 빼주는 것이다.
(count는 n으로 초기화 되어있다.)
<br>