---
layout: post
title: "[BOJ #1007] 벡터매칭 Python3"
category: algorithm
author: jihak
create_date: "2023-06-02"
preview: 브루트포스 문제이지만 진짜로 전부 다 하면 안되고 벡터의 성질을 이용해서 푸는 문제
image_url: "https://user-images.githubusercontent.com/48908552/255297969-47c132e0-75e5-4dfb-8be3-93c95d6488db.png"
---

### 링크

<a href= "https://www.acmicpc.net/problem/1007">https://www.acmicpc.net/problem/1007</a>

<br>

### 문제

평면 상에 N개의 점이 찍혀있고, 그 점을 집합 P라고 하자. 집합 P의 벡터 매칭은 벡터의 집합인데, 모든 벡터는 집합 P의 한 점에서 시작해서, 또 다른 점에서 끝나는 벡터의 집합이다. 또, P에 속하는 모든 점은 한 번씩 쓰여야 한다.

벡터 매칭에 있는 벡터의 개수는 P에 있는 점의 절반이다.

평면 상의 점이 주어졌을 때, 집합 P의 벡터 매칭에 있는 벡터의 합의 길이의 최솟값을 출력하는 프로그램을 작성하시오.

<br>

### 입력

첫째 줄에 테스트 케이스의 개수 T가 주어진다. 각 테스트 케이스는 다음과 같이 구성되어있다.

테스트 케이스의 첫째 줄에 점의 개수 N이 주어진다. N은 짝수이다. 둘째 줄부터 N개의 줄에 점의 좌표가 주어진다. N은 20보다 작거나 같은 자연수이고, 좌표는 절댓값이 100,000보다 작거나 같은 정수다. 모든 점은 서로 다르다.
<br>

### 출력

각 테스트 케이스마다 정답을 출력한다. 절대/상대 오차는 10-6까지 허용한다.
<br>

### 풀이

**접근 방법 1**   
처음에는 나올 수 있는 점들의 집합의 경우의 수를 모두 구한 다음에 두 점 사이의 거리를 단순하게 계산하려고 했다.    
예를들어 점 4개가 $a, b, c, d, e, f$가 있으면 $\binom{6}{2} \times \binom{4}{2} \times \binom{2}{2}$ 의 경우의 수가 나오게 되어서 점과 점 사이의 거리를 다 계산해서 구하는 방법이다.    
하지만 이 방법은 빠르게 포기했어야했다.
점의 개수가 최대 20개인데 $\binom{20}{2} \times \binom{18}{2} \times ... \times \binom{2}{2}$ 이기 때문에 딱봐도 시간초과 날것이기 때문이다.

**접근 방법 2**     
어떻게 풀지 감이 안잡혀서 아주 살짝 질문글을 봤다.   
그랬더니 벡터에 초점을 두고서 풀면 됬었다.   
점이 $P_1(x_1,y_1), P_2(x_2,y_2), P_3(x_3,y_3), P_4(x_4,y_4)$ 이런식으로 있다면 집합 하나를 보면 $(x_1-x_2,y_1-y_2) 와 (x_3-x_4,y_3-y_4)$ 로 두 개의 벡터로 나타나집니다.   
그럼 이 두벡터의 합은 $(x_1-x_2 + x_3-x_4, y_1-y_2 + y_3-y_4)$ 와 같이 나타납니다.   
이 것을 보고서 최대 경우의 수는 $\binom{20}{10}$인 것을 알 수 있습니다.   

구현 방법으로는 x, y좌표의 합을 전부 구한 다음에 나올 수 있는 조합의 수를 combinations를 이용해서 구해준다.    
더하기의 집합 합을 구해주고 total_에서 빼줘서 빼기의 집합 합을 구해줘서 계산해주면 된다.   


```python

# 벡터매칭 / 1007.py
# 알고리즘 분류: 

import sys
import math
from itertools import combinations
input = sys.stdin.readline

t = int(input())
for _ in range(t):
    n = int(input().strip())
    points = []
    ans = 100_000_000_000
    total_x, total_y = 0,0
    for _ in range(n):
        x, y = map(int,input().strip().split())
        points.append([x,y])    
        total_x += x
        total_y += y
    for i in combinations(range(n),n//2):
        xsum=0; ysum = 0

        for j in i:
            xsum += points[j][0]
            ysum += points[j][1]
        xsum -= total_x - xsum
        ysum -= total_y - ysum
        ans = min(ans, math.sqrt(math.pow(xsum,2) + math.pow(ysum,2)))
    print(ans)


```

<br>

### 풀고 나서

접근 방법만 잘 생각하면 쉬운문제였지만 접근하기가 어려웠다.   
파이썬에는 combinations library가 있기 때문에 구현하기가 쉬웠던 것 같았다. 
