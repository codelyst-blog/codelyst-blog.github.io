---
layout: post
title: "[BOJ #9084] 동전 Python3"
categories: algorithm
author: JIHAK
preview: 기본적인 냅색 문제! 냅색 문제를 풀어본 적이 있다면 잘 기억해서 어렵지 않게 풀 수 있다. 
image_url: "https://github.com/codelyst-blog/codelyst-blog-deprecate.github.io/assets/55094745/aa6ece51-00f3-4f63-8507-dac33c70a4e2"
---

### 링크
<a href= "https://www.acmicpc.net/problem/9084">https://www.acmicpc.net/problem/9084</a>


<br>

### 문제
우리나라 화폐단위, 특히 동전에는 1원, 5원, 10원, 50원, 100원, 500원이 있다. 이 동전들로는 정수의 금액을 만들 수 있으며 그 방법도 여러 가지가 있을 수 있다. 예를 들어, 30원을 만들기 위해서는 1원짜리 30개 또는 10원짜리 2개와 5원짜리 2개 등의 방법이 가능하다.

동전의 종류가 주어질 때에 주어진 금액을 만드는 모든 방법을 세는 프로그램을 작성하시오.


<br>

### 입력
입력의 첫 줄에는 테스트 케이스의 개수 T(1 ≤ T ≤ 10)가 주어진다. 각 테스트 케이스의 첫 번째 줄에는 동전의 가지 수 N(1 ≤ N ≤ 20)이 주어지고 두 번째 줄에는 N가지 동전의 각 금액이 오름차순으로 정렬되어 주어진다. 각 금액은 정수로서 1원부터 10000원까지 있을 수 있으며 공백으로 구분된다. 세 번째 줄에는 주어진 N가지 동전으로 만들어야 할 금액 M(1 ≤ M ≤ 10000)이 주어진다.

편의를 위해 방법의 수는 2^31 - 1 보다 작고, 같은 동전이 여러 번 주어지는 경우는 없다.
<br>
    
### 출력
각 테스트 케이스에 대해 입력으로 주어지는 N가지 동전으로 금액 M을 만드는 모든 방법의 수를 한 줄에 하나씩 출력한다.
<br>
      
### 풀이

예시로 동전의 가지수 N은 `3`이 주어지고 동전의 금액은 `2, 3, 5` 그리고 만들어야할 금액 M이 `12`이라고 해보면


처음에 배열은 다음과 같이 초기화 되어있다.   
<img src = "https://github.com/codelyst-blog/codelyst-blog-deprecate.github.io/assets/55094745/3bb78608-ef17-4886-ab44-8f2949f15053" alt = "1">
0에서 1로 초기화 한 이유는 아무것도 넣지 않는다면 0 금액을 만들 수 있기 때문이다.   

처음에 동전 `2` 만들 수 있는 금액을 구해본다. 
<img src = "https://github.com/codelyst-blog/codelyst-blog-deprecate.github.io/assets/55094745/4e925ae5-5ad0-454f-b608-f5473d243fc1" alt = "2">

그러면 위 사진과 같이 2의 배수만 채워지는 것을 알 수 있다.  
이는 2를 뺀 값이 거기에 존재 한다면 더해주는 것이다.   
이에 대한 자세한 설명은 3을 진행하면서 자세히 진행해보겠습니다.   

<img src="https://github.com/codelyst-blog/codelyst-blog-deprecate.github.io/assets/55094745/d443d216-353a-4e7a-a7e8-70f685da35cc" alt="3">
다음에는 2에서 찾은 값들을 3으로 그대로 복사해준다.
<img src="https://github.com/codelyst-blog/codelyst-blog-deprecate.github.io/assets/55094745/60a050e1-240e-4f8f-9dc1-420f47632e1a" alt="4">
그리고서 만약 무게 i를 0부터 12까지 반복하면서 i-3을 뺀 값이 0보다 크다면 기존에 있는 값(복사된 값)과 더해주면 된다.

<img src="https://github.com/codelyst-blog/codelyst-blog-deprecate.github.io/assets/55094745/c6e89e6a-c111-47db-a8d1-f75ebc862e1e" alt="5">
5에서도 마찬가지로 3에 있던 값을 그대로 복사해주도록 한다.
<img src="https://github.com/codelyst-blog/codelyst-blog-deprecate.github.io/assets/55094745/fd33cf2f-551e-4e23-b3af-1768683ea788" alt="6">
또 마찬가지로 무게 0~12까지 반복하면서 i-5을 뺀 값이 0보다 크다면 기존에 있는 값과 더해준다.

이렇게하면 맨 배열의 마지막 값 `4`가 금액 `12`을 만들 수 있는 가짓수이다.


```python

# 동전 / 9084.py
# 알고리즘 분류: 다이나믹 프로그래밍, 배낭 문제

import sys

input = sys.stdin.readline
t = int(input())

for _ in range(t):
    n = int(input())
    coins = list(map(int, input().split()))
    amount = int(input())
    dp = {}
    
    for i in coins:
        dp[i] = [0]*(amount+1)
        dp[i][0] = 1

    for i in range(n):
        for j in range(1, amount+1):
            dp[coins[i]][j] = dp[coins[i-1]][j]
            if j-coins[i] >= 0:
                dp[coins[i]][j] += dp[coins[i]][j-coins[i]]
    print(dp[coins[-1]][amount])

    
``` 


<br>

### 풀고 나서

원래 1차원 배열로 푸는 방법이 있었던걸 아는데 생각이 안나서 2차원 배열로 풀었다.   
이렇게 풀면 공간복잡도가 커져서 안좋긴 하지만 그래도 쉽게 풀수 있어서 좋다.    

다른 사람풀이 보니까 나처럼 dictionary로 하지 않고 동전이 2,3,10 이런식으로 있으면    
2~10까지 모두 선언했었는데 그래도 나는 이 정도면 공간복잡도 적당히 생각하면서 잘 푼 것 같다.   
물론 1차원으로 푸는게 제일 좋긴하다!!   
다음에 냅색문제를 풀게 되면 1차원 배열로 풀어보고 글 올리도록 해보는 걸로(❁´◡`❁)~~
