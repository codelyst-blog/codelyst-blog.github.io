---
layout: post
title: "[BOJ #1941] 소문난 칠공주 Python3"
category: algorithm
author: jihak
create_date: "2023-08-12"
preview:  소문난 칠공주/브루트포스, 너비탐색
image_url: "https://user-images.githubusercontent.com/48908552/260309451-88f3b84e-582f-4f8d-8734-7cc19e3e6822.png"
---

### 링크

<a href= "https://www.acmicpc.net/problem/1941">https://www.acmicpc.net/problem/1941</a>

<br>

### 문제

총 25명의 여학생들로 이루어진 여학생반은 5×5의 정사각형 격자 형태로 자리가 배치되었고, 얼마 지나지 않아 이다솜과 임도연이라는 두 학생이 두각을 나타내며 다른 학생들을 휘어잡기 시작했다. 곧 모든 여학생이 ‘이다솜파’와 ‘임도연파’의 두 파로 갈라지게 되었으며, 얼마 지나지 않아 ‘임도연파’가 세력을 확장시키며 ‘이다솜파’를 위협하기 시작했다.

위기의식을 느낀 ‘이다솜파’의 학생들은 과감히 현재의 체제를 포기하고, ‘소문난 칠공주’를 결성하는 것이 유일한 생존 수단임을 깨달았다. ‘소문난 칠공주’는 다음과 같은 규칙을 만족해야 한다.

1. 이름이 이름인 만큼, 7명의 여학생들로 구성되어야 한다.
2. 강한 결속력을 위해, 7명의 자리는 서로 가로나 세로로 반드시 인접해 있어야 한다.
3. 화합과 번영을 위해, 반드시 ‘이다솜파’의 학생들로만 구성될 필요는 없다.
4. 그러나 생존을 위해, ‘이다솜파’가 반드시 우위를 점해야 한다. 따라서 7명의 학생 중 ‘이다솜파’의 학생이 적어도 4명 이상은 반드시 포함되어 있어야 한다.    
여학생반의 자리 배치도가 주어졌을 때, ‘소문난 칠공주’를 결성할 수 있는 모든 경우의 수를 구하는 프로그램을 작성하시오.

<br>

### 입력

'S'(이다‘솜’파의 학생을 나타냄) 또는 'Y'(임도‘연’파의 학생을 나타냄)을 값으로 갖는 5*5 행렬이 공백 없이 첫째 줄부터 다섯 줄에 걸쳐 주어진다.

<br>

### 출력

첫째 줄에 ‘소문난 칠공주’를 결성할 수 있는 모든 경우의 수를 출력한다.  


### 예제 입력

<img src="https://user-images.githubusercontent.com/48908552/260309043-7e7a531e-c460-4529-b83b-400bb98f498d.png"/>

<br>

### 풀이


```python
# 소문난 칠공주, 1941.py
# 출처: Olympiad > USA Computing Olympiad > 2004-2005 Season > USACO February 2005 Contest > Silver 2번
# 알고리즘 분류: 수학, 그래프 이론, 브루트포스 알고리즘, 그래프 탐색, 너비 우선 탐색, 조합론, 백트래킹
from itertools import combinations
from collections import deque

# 좌표 만들기
cos = []
for i in range(5):
    for j in range(5):
        cos.append([i,j])

dx = [1,-1,0,0]; dy = [0,0,1,-1]
ans = 0
students = []
for i in range(5):
    students.append(list(input()))
for i in combinations(cos,7): # 좌표서 7개 뽑기
    dasom_cnt = 0; doyeon_cnt = 0
    visited = [[False]*5 for _ in range(5)] # bfs에서 방문표시
    cnt = 1 # cnt가 7이 되면 인접하는 것을 확인하기 위해서 만든 변수
    for x,y in i:
        if students[x][y] == "S":
            dasom_cnt += 1         
        elif students[x][y] == "Y":
            doyeon_cnt += 1
    if dasom_cnt < 4:
        continue
    queue = deque()
    queue.append((i[0][0], i[0][1]))
    visited[i[0][0]][i[0][1]] = True
    while queue:
        x, y = queue.popleft()
        for k in range(4):
            nx = x + dx[k]
            ny = y + dy[k]
            if 0<=nx<5 and 0<=ny<5 and visited[nx][ny] == False:
                visited[nx][ny] = True
                
                if [nx, ny] in i: # 좌표가 존재한다면 
                    queue.append((nx,ny)) 
                    cnt += 1
    if cnt == 7:
        ans += 1
print(ans)

```
먼저 좌표의 공간을 만들어준다.

그리고 그 좌표를 25C7을 해준다.

뭔가 시간초과 날것 같지만 25C7은 약40만이기 때문에 충분히 돌릴 수 있다.

 

뽑은 좌표 중에서 dascom_cnt가 4이상인 것만 bfs를 돌아서 서로 인접했는지 확인해주도록 한다.

 

다른 언어라면 조합을 백트래킹으로 구현해야겠지만

파이썬에서는 정말 친절하게 combinations가 있기 때문에 이것을 사용해주면 쉽게 풀 수 있다.
<br>