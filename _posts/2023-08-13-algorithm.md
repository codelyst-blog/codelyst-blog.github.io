---
layout: post
title: "[BOJ #22358] 스키장 c++"
category: algorithm
author: kira
create_date: "2023-08-13"
preview: 케이스를 나누어 풀면 쉬운 그래프 문제
image_url: "https://github.com/codelyst-blog/codelyst-blog.github.io/assets/54790133/0eebd4f8-91e6-4a41-b2d6-b4ac005c41f9"
---

### 링크

<a href= "https://www.acmicpc.net/problem/22358">https://www.acmicpc.net/problem/22358</a>

<br>

### 문제

당신은 친구들과 함께 스키를 타러 스키장에 왔다. 스키장에는 일정 고도마다 중간 지점이 설치되어 있다. 중간 지점은 총 $N$개 있으며, 고도가 감소하는 순서대로 1번부터 $N$번까지 번호가 매겨져 있다. 즉 가장 높은 지점이 1번 지점, 가장 낮은 지점이 $N$번 지점이다. 현재 당신은 $S$번 지점에 친구들과 함께 있다. 당신의 친구들은 각자 자유롭게 스키를 탄 이후, 끝나면 $T$번 지점에 모이기로 약속했다. 스키장에는 $M$개의 코스가 있다. 각 코스는 $a_i$번 지점에서 $b_i$번 지점 방향으로 이어지며, 코스에 진입하면 $t_i$시간 동안 스키를 탈 수 있다. 코스는 항상 고도가 감소하는 방향으로 이어진다. 즉, $a_i < b_i$를 만족한다. 또한, 각 코스에는 스키 리프트가 있다. 스키 리프트는 코스와는 반대 방향으로, 고도가 증가하는 방향으로 이어진다. 즉, 스키 리프트를 타면 $b_i$번 지점에서 $a_i$번 지점으로 이동할 수 있다. 스키 리프트는 최대 $K$번 탑승할 수 있다. 당신은 스키 코스와 리프트만을 사용해서 $T$번 지점까지 가되, 스키를 타는 시간을 최대화하려고 한다. 리프트를 타는 시간은 스키를 타는 시간에 포함되지 않는다. 코스의 정보가 주어질 때, 최대 몇 시간 동안 스키를 탈 수 있을지 구하여라.

<br>

### 입력

첫 번째 줄에 다섯 개의 정수 $N, M, K, S, T$ ( $1 \le N, M \le 10^5$, $0 \le K \le 10$, $1 \le S, T \le N$) 가 주어진다. 이후 $M$ 개의 줄에 각 코스의 정보가 세 개의 정수 $a_i, b_i, t_i$ ( $1 \le a_i < b_i \le N$, $1 \le t_i \le 10^9$) 로 주어진다. 서로 다른 두 지점을 잇는 코스는 최대 하나이다.

<br>

### 출력

최대 몇 시간 동안 스키를 탈 수 있는지 하나의 정수로 출력하라. 만약 어떻게 코스와 리프트를 선택해도 $T$번 지점으로 이동할 수 없다면 -1을 대신 출력하라.

<br>

### 풀이

항상 순방향인 경우 v(next) > cur(current)이며, 리프트를 타는 역방향의 경우  v(next) < cur(current)임을 이용해 아래와 같이 코드구성 가능



1. 리프트 이용 횟수가 남았고(cnt < K), 역방향(v < cur)으로 움직이는 경우
```
if (cnt < K && v < cur) 
	tmp = max(tmp, dp(v, cnt + 1));
```

2. 순방향(v > cur)으로 움직이는 경우
```
else if ( v > cur ) // 순방향 움직임일 때
	tmp = max(tmp, dp(v, cnt) + cost);
```

코드
- 처음에는 파이썬으로 풀어보려 했으나 계속해서 시간초과가 떠서 같은 로직으로 c++로 짜서 통과

- 입력 변수 중 최대값이 $t <= 10^9$여서 int로 했으나 시간초과 뜸

- 모든 입력변수 타입을 long long으로 바꾸니 통과됨

```
#include <iostream>
#include <vector>
#include <cstring>
using namespace std;
#define ll long long
const int MAX = 100001;
const ll INF = 1e16;

ll N, M, K, S, T;
ll ans = -1;
ll d[MAX][11];
vector<pair<int,int>> v[MAX];

ll dp(int cur, int cnt);

int main(void){
    ios::sync_with_stdio(false);
    cin.tie(0); cout.tie(0);
    memset(d, -1, sizeof(d));
    
    cin >> N >> M >> K >> S >> T;
    
    for (int i = 0; i < M; i++){
        int a, b, t;
        cin >> a >> b >> t;
        v[a].push_back(make_pair(b,t));
        v[b].push_back(make_pair(a,t));
    }
    ans = dp(S, 0);
    if (ans < 0)
        cout << -1;
    else
        cout << ans;
}

ll dp(int cur, int cnt){
    if ( cnt > K ) return -(INF); // 리프트 이용 최대횟수 초과
    if (cnt == K && cur == T) return 0; // 리프트 이용 최대횟수이며 현재 위치가 도착지점일 때
    
    ll& tmp = d[cur][cnt];
    
    if (tmp != -1) return tmp;
    
    tmp = -(INF);
    
    for (auto e:v[cur]){
        int v, cost;
        v = e.first; cost = e.second;
        if (cnt < K && v < cur) // 리프트 이용 가능 and 역방향 움직임일 때
            tmp = max(tmp, dp(v, cnt + 1));
        else if ( v > cur ) // 순방향 움직임일 때
            tmp = max(tmp, dp(v, cnt) + cost);
    }
    return tmp;
}
```
