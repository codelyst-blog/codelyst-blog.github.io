---
layout: post
title: "[BOJ #14500] 테르토미노 Python3"
category: algorithm
author: kira
create_date: "2023-08-06"
preview: 구현 문제처럼 보이지만, DFS를 이용해 케이스를 나눈다면 간단하게 풀 수 있는 문제
image_url: "https://github.com/codelyst-blog/codelyst-blog.github.io/assets/54790133/454332ec-4e5e-44d5-9ca8-ddfc59674134"
---

### 링크

<a href= "https://www.acmicpc.net/problem/14500">https://www.acmicpc.net/problem/14500</a>

<br>

### 문제

폴리오미노란 크기가 1×1인 정사각형을 여러 개 이어서 붙인 도형이며, 다음과 같은 조건을 만족해야 한다.

정사각형은 서로 겹치면 안 된다.
도형은 모두 연결되어 있어야 한다.
정사각형의 변끼리 연결되어 있어야 한다. 즉, 꼭짓점과 꼭짓점만 맞닿아 있으면 안 된다.
정사각형 4개를 이어 붙인 폴리오미노는 테트로미노라고 하며, 다음과 같은 5가지가 있다.

<img width="200" alt="img.png" src="https://github.com/codelyst-blog/codelyst-blog.github.io/assets/54790133/aabed87c-62a8-4963-9d18-468acde43482">

아름이는 크기가 N×M인 종이 위에 테트로미노 하나를 놓으려고 한다. 종이는 1×1 크기의 칸으로 나누어져 있으며, 각각의 칸에는 정수가 하나 쓰여 있다.

테트로미노 하나를 적절히 놓아서 테트로미노가 놓인 칸에 쓰여 있는 수들의 합을 최대로 하는 프로그램을 작성하시오.

테트로미노는 반드시 한 정사각형이 정확히 하나의 칸을 포함하도록 놓아야 하며, 회전이나 대칭을 시켜도 된다.

<br>

### 입력

아름이는 크기가 N×M인 종이 위에 테트로미노 하나를 놓으려고 한다. 종이는 1×1 크기의 칸으로 나누어져 있으며, 각각의 칸에는 정수가 하나 쓰여 있다.

테트로미노 하나를 적절히 놓아서 테트로미노가 놓인 칸에 쓰여 있는 수들의 합을 최대로 하는 프로그램을 작성하시오.

테트로미노는 반드시 한 정사각형이 정확히 하나의 칸을 포함하도록 놓아야 하며, 회전이나 대칭을 시켜도 된다
<br>

### 출력

첫째 줄에 테트로미노가 놓인 칸에 쓰인 수들의 합의 최댓값을 출력한다.
<br>

### 풀이

**접근 방법**   
처음 이 문제를 봤을 때, 구현 문제라는 생각이 들어 이를 최대한 간단하게 구현하는 방법이 무엇인지에 대해 먼저 생각했다. 먼저, 문제에서 제시한 테트로미노 모양들을 5가지 각각으로 보는 것이 아닌 묶을 수 있는 것들은 최대한 같은 유형으로 묶어 보았다. 모양들을 유심히 보니, "ㅗ" 모양을 빼고는 모두 DFS를 4칸 돌렸을 때 나올 수 있는 도형들이었다. 그래서 나머지 모형들은 모두  기본적인 DFS 코드로 각각의 칸들을 4번 돌려 값들을 저장해두었고, "ㅗ" 모양만 예외로 두어 따로 처리하였다. 코드에서 보면, "-" 혹은 "ㅣ" 모양으로 세칸을 간 형태일 때 각각 check[1][1], check[1][0]에 up/down, right/left를 한칸하여 "ㅗ,ㅜ", "ㅏ,ㅓ" 등 "ㅗ"가 회전해서 생길 수 있는 경우의 수를 모두 방문하였다. 코드는 아래와 같다.
 


```python

# 벡터매칭 / 14500.py
# 알고리즘 분류: DFS

import sys
input = sys.stdin.readline

dy = [-1,0,1,0]
dx = [0,1,0,-1]

N, M = map(int, input().split())
paper = []
for _ in range(N):
    paper.append(list(map(int, input().split())))

ans = 0
def dfs(x, y, val, tetro_type, check): 
    if tetro_type == 4: 
        global ans
        ans = max(ans, val)
        return ans
    for i in range(3):
        nx = x + dx[i] 
        ny = y + dy[i] 
        if (nx, ny) in check: continue
        if nx < 0 or nx >= N or ny < 0 or ny >= M: continue
       
        if tetro_type == 3:
            if check[0][1] == check[1][1] == check[2][1]: # 같은 y축 상에 있는지 체크 ---
                for j in [-1, 1]: # ㅗ, ㅜ
                    check_y = check[1][1] + j 
                    if check_y < 0 or check_y >= M: continue
                    dfs(check[1][0], check_y, val + paper[check[1][0]][check_y], tetro_type + 1, check + [(check[1][0], check_y)])
            elif check[0][0] == check[1][0] == check[2][0]# 같은 x축에 있는지 체크 
                for j in [-1, 1]: # ㅓ, ㅏ
                    check_x = check[1][0] + j
                    if check_x < 0 or check_x >= N:
                        continue
                    dfs(check_x, check[1][1], val + paper[check_x][check[1][1]], tetro_type + 1, check + [(check_x, check[1][1])])
        dfs(nx, ny, val + paper[nx][ny], tetro_type + 1, check + [(nx, ny)])
        
for i in range(N):
    for j in range(M):
        dfs(i, j, paper[i][j], 1, [(i, j)]) 
print(ans)


```

<br>

### 풀고 나서

더 간단하게 풀 수 있는 방법이 있는지 궁금한 코드
