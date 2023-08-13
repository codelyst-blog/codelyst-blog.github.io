---
layout: post
title: "[BOJ #3228] PIZZA c++"
category: algorithm
author: kritias
create_date: "2023-08-13"
preview:  \#거리비교 \#브루트포스 \#조합
image_url: "https://github.com/codelyst-blog/codelyst-blog.github.io/assets/50093609/56ab037f-09d3-44ee-be71-e5194a8bc239"
---

### 링크

<a href= "https://www.acmicpc.net/problem/3228">https://www.acmicpc.net/problem/3228</a>

<br>

### 문제

Picko는 반경 R만큼 배달할 수 있는 피자집을 K개 만큼 차리려고 한다.  

피자집이 들어설 수 있는 후보지의 개수 M과 각 후보지의 2차원 좌표 (X, Y)가 주어지고,  

피자를 시켜먹을 집들의 개수 N과 각 집의 2차원 좌표와 사는 사람의 수 (X, Y, S)가 주어질 때,  

적절한 위치에 피자집들을 차려서 커버할 수 있는 사람들의 최댓값을 구하는 프로그램을 작성하시오.

<br>

### 입력

첫째 줄에 K (1이상 10이하), R (1이상 50이하)이 주어진다. 

두 번째 줄에 M (K이상 20이하)가 주어진다.  

다음 줄부터 M개의 줄에 X, Y가 주어진다. (각각 절댓값 1000이하)  

다음 줄에 N (1이상 100이하)가 주어진다.

다음 줄부터 N개의 줄에 X, Y, S가 주어진다. (X, Y는 각각 절댓값 1000이하, S는 1이상 100이하)  

동일한 위치에 둘 이상의 후보지가 주어지지 않는다.

<br>

### 출력

한 줄로 문제의 정답을 출력한다.   
<br>

### 풀이

먼저 후보지마다 도달할 수 있는 집을 graph에 저장한다.  

next_permutation 함수에 1의 개수가 K, 전체 길이가 M인 binary vector를 돌려서 완전탐색한다.  

각 루프마다 1로서 선택된 후보지가 도달할 수 있는 집들의 집합을 구하고, 집의 S값을 모두 더해 정답을 업데이트한다.  

시간 복잡도에서의 dominant term이 $N\binom {M}{K} \leq 19,000,000$ 이므로 충분히 사용할 수 있는 방법이다.

```c++

#include <iostream>
#include <cstdlib>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;
typedef pair<int, int> pii;

#define X first
#define Y second

void init()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	cout.tie(nullptr);
}

int main(void) {
	init();
	int k, r, m, n;
	cin >> k >> r;
	r *= r;
	cin >> m;
	vector<pii> locs = vector<pii>(m);
	for(int i = 0; i < m; i++) cin >> locs[i].X >> locs[i].Y;
	cin >> n;
	vector<pii> sols = vector<pii>(n);
	vector<int> scores = vector<int>(n);
	for(int i = 0; i < n; i++) cin >> sols[i].X >> sols[i].Y >> scores[i];

	// 먼저, 각 loc 별로 도달할 수 있는 sol을 저장하자.
	vector<vector<int>> graph = vector<vector<int>>(m);
	for(int i = 0; i < m; i++) for(int j = 0; j < n; j++)
	{
		int dist = (locs[i].X - sols[j].X) * (locs[i].X - sols[j].X) + (locs[i].Y - sols[j].Y) * (locs[i].Y - sols[j].Y);
		// cout << "loc[" << i << "] (" << locs[i].X << ", " << locs[i].Y << ") <-> sol[" << j << "] (" << sols[j].X << ", " << sols[j].Y << "): " << dist << '\n';
		if (dist <= r) graph[i].push_back(j);
	}

	vector<int> perm = vector<int>(m, 0);
	int ans = 0;
	for(int i = m - 1; i >= m - k; i--) perm[i] = 1;
	do {
		vector<int> visit = vector<int>(n, false);
		int res = 0;
		for(int i = 0; i < m; i++) if(perm[i]) for(int e : graph[i]) visit[e] = true;
		for(int i = 0; i < n; i++) res += visit[i] * scores[i];
		ans = max(ans, res);
	} while(next_permutation(perm.begin(), perm.end()));
	cout << ans << '\n';
	return 0;
}

```
<br>