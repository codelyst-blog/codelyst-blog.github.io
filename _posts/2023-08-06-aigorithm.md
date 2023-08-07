---
layout: post
title: "[BOJ #17103] 골드바흐 파티션 C++"
category: algorithm
author: kritias
create_date: "2023-08-06"
preview: 특정 조건의 소수 쌍을 빠르게 찾는 방법
image_url: "https://github.com/codelyst-blog/codelyst-blog.github.io/assets/54790133/700d9cb4-8846-4a60-8250-0591bc5ebe09"
---

### 링크

<a href= "https://www.acmicpc.net/problem/17103">https://www.acmicpc.net/problem/17103</a>

<br>

### 문제

- 골드바흐의 추측: 2보다 큰 짝수는 두 소수의 합으로 나타낼 수 있다.  

짝수 N을 두 소수의 합으로 나타내는 표현을 골드바흐 파티션이라고 한다. 짝수 N이 주어졌을 때, 골드바흐 파티션의 개수를 구해보자. 두 소수의 순서만 다른 것은 같은 파티션이다.  

<br>

### 입력

첫째 줄에 테스트 케이스의 개수 T (1 ≤ T ≤ 100)가 주어진다.  
각 테스트 케이스는 한 줄로 이루어져 있고, 정수 N은 짝수이고, 2 < N ≤ 1,000,000을 만족한다.

<br>

### 출력

각각의 테스트 케이스마다 골드바흐 파티션의 수를 출력한다.  
<br>

### 풀이

에라토스테네스의 체를 이용해, 테스트케이스마다 받은 N의 최댓값까지 소수 목록 primes와 소수 판별 배열 check를 구한다.

각 테스트케이스의 N에 대해, N - primes이 소수인지, 즉, check[N-primes]가 true인지 확인하면 된다.

```c++

#include <iostream>
#include <vector>
#include <cstdio>
using namespace std;

/*
골드바흐의 추측

범위 : 1000000 (홀수만이므로 500000개)
테스트 : 100개
시간제한 : 5억회 (5초)
*/
vector<bool> eratos(int num);
int solver(int num, vector<bool> table);

// 홀수인 소수를 저장하는 벡터
vector<int> primes;


int main(void)
{
	int arr[100000];
	int test_case;
	int max = 0;
	scanf("%d", &test_case);
	// 입력
	for(int i = 0; i < test_case; i++)
	{
		int input;
		scanf("%d", &input);
		if (max < input)
			max = input;
        // 입력받은 수 저장
		arr[i] = input;
	}
	// 최댓값까지 소수 구하기
	vector<bool> table = eratos(max);
	// 수행
	for (int i = 0; i < test_case; i++)
	{
		int result = solver(arr[i], table);
		printf("%d\n", result);
	}
	return 0;
}

vector<bool> eratos(int num)
{
	vector<bool> check(num + 1);
	check[1] = true;
	for (int i = 3; i <= num; i += 2) //홀수 체크
		// 소수라면
		if (!check[i])
		{
			primes.push_back(i);
			for (int j = i * 3; j <= num; j += i * 2)
				check[j] = true;
		}
	return check;
}

int solver(int num, vector<bool> table)
{
	if (num < 10) return 1;
	int count = 0;
    // 중간값부터 0까지 탐색
	for (int i = 0; primes[i] <= num/2 ; i++)
		if (!table[num - primes[i]])
			count++;
	return count;
}

```

<br>

### 풀고 나서

참고로 문제에서의 N 아래에서는 골드바흐의 추측이 맞다는 것이 확인되었다. 

비슷한 문제로 골드바흐의 추측이 있는데, 이 문제와 같은 방식으로 풀 수 있다.
