---
layout: post
title: "[프로그래머스] 달리기 경주 Python3"
category: algorithm
author: jihak
create_date: "2023-08-18"
preview: "프로그래머스 연습문제 level1 달리기 경주 "
image_url: "https://user-images.githubusercontent.com/48908552/266554302-143963d1-46c8-48ee-89eb-31c4ad6f72b9.png"
---

### 링크

<a href= "https://school.programmers.co.kr/learn/courses/30/lessons/178871">https://school.programmers.co.kr/learn/courses/30/lessons/178871</a>

<br>

### 문제 설명

얀에서는 매년 달리기 경주가 열립니다. 해설진들은 선수들이 자기 바로 앞의 선수를 추월할 때 추월한 선수의 이름을 부릅니다. 예를 들어 1등부터 3등까지 "mumu", "soe", "poe" 선수들이 순서대로 달리고 있을 때, 해설진이 "soe"선수를 불렀다면 2등인 "soe" 선수가 1등인 "mumu" 선수를 추월했다는 것입니다. 즉 "soe" 선수가 1등, "mumu" 선수가 2등으로 바뀝니다.

선수들의 이름이 1등부터 현재 등수 순서대로 담긴 문자열 배열 players와 해설진이 부른 이름을 담은 문자열 배열 callings가 매개변수로 주어질 때, 경주가 끝났을 때 선수들의 이름을 1등부터 등수 순서대로 배열에 담아 return 하는 solution 함수를 완성해주세요.
<br>

### 제한 사항
- 5 ≤ players의 길이 ≤ 50,000
    - players[i]는 i번째 선수의 이름을 의미합니다.
    - players의 원소들은 알파벳 소문자로만 이루어져 있습니다.
    - players에는 중복된 값이 들어가 있지 않습니다.
- 3 ≤ players[i]의 길이 ≤ 10
    - 2 ≤ callings의 길이 ≤ 1,000,000
    - callings는 players의 원소들로만 이루어져 있습니다.
    - 경주 진행중 1등인 선수의 이름은 불리지 않습니다.

### 입출력 예시

players: ["mumu", "soe", "poe", "kai", "mine"]
callings: ["kai", "kai", "mine", "mine"]
result: ["mumu", "kai", "mine", "soe", "poe"]

<br>


### 풀이


```python
from collections import defaultdict

def solution(players, callings):
    
    d_play1 = defaultdict(int)
    d_play2 = defaultdict(str)
    for i, x in enumerate(players):
        d_play1[x] = i
        d_play2[i] = x

    
    for x in callings:
        ind = d_play1[x]
        temp = d_play2[ind-1]
        
        d_play1[x] -= 1
        d_play2[ind-1] = x
        
        d_play1[temp] += 1
        d_play2[ind] = temp
        
    
    return list(d_play2.values())

```

level1 문제여서 쉽게 풀거라고 생각했지만 계속된 시간초과가 났다.

처음에는 당연히 이것은 쉬운 문제겠지 생각하면서 list에서 index를 이용하여 하나하나 다 찾아줬다.   
하지만 index의 시간복잡도는 O(n)이기 때문에 시간초과가 나게 되었다.    

그래서 문제를 인덱스를 찾을 때 O(1)로 해결하기 위해서 dictionary를 이용하기로 했다.   
여기서 생각해야할 점이 player:index, index:player 이런식으로 두개의 dictionary를 생성해서    
call 될 때마다 player와 index를 변경을 해줘야한다.   

이런식으로 풀면 calling의 크기만큼의 시간복잡도가 나와서 문제를 해결할 수 있게 된다.   
<br>