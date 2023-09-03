---
layout: post
title: "[BOJ #1339] 단어수학 c++"
category: algorithm
author: kritias
create_date: "2023-09-03"
preview:  구현
image_url: "https://github.com/codelyst-blog/codelyst-blog.github.io/assets/50093609/47830ed7-1154-42d9-bddc-a85d0e471aec"
---

### 링크

<a href= "https://www.acmicpc.net/problem/1339">https://www.acmicpc.net/problem/1339</a>

<br>

### 문제

민식이는 수학학원에서 단어 수학 문제를 푸는 숙제를 받았다.

단어 수학 문제는 N개의 단어로 이루어져 있으며, 각 단어는 알파벳 대문자로만 이루어져 있다. 이때, 각 알파벳 대문자를 0부터 9까지의 숫자 중 하나로 바꿔서 N개의 수를 합하는 문제이다. 같은 알파벳은 같은 숫자로 바꿔야 하며, 두 개 이상의 알파벳이 같은 숫자로 바뀌어지면 안 된다.

예를 들어, GCF + ACDEB를 계산한다고 할 때, A = 9, B = 4, C = 8, D = 6, E = 5, F = 3, G = 7로 결정한다면, 두 수의 합은 99437이 되어서 최대가 될 것이다.

N개의 단어가 주어졌을 때, 그 수의 합을 최대로 만드는 프로그램을 작성하시오.

<br>

### 입력

첫째 줄에 단어의 개수 N(1 ≤ N ≤ 10)이 주어진다. 둘째 줄부터 N개의 줄에 단어가 한 줄에 하나씩 주어진다.  

단어는 알파벳 대문자로만 이루어져있다.  

모든 단어에 포함되어 있는 알파벳은 최대 10개이고, 수의 최대 길이는 8이다.  

서로 다른 문자는 서로 다른 숫자를 나타낸다.

<br>

### 출력

첫째 줄에 주어진 단어의 합의 최댓값을 출력한다.  

<br>

### 풀이

주어진 수식을 등장한 등장한 알파벳과 그 계수에 대한 식으로 정리한다.  

예를 들어 예제 2번의 GCF + ACDEB는 100G + 1010C + F + 10000A + 100D + 10E + B로 정리할 수 있다.  

각 알파벳에 대응하는 계수를 alpha배열에 저장해준다. 인덱스는 각 알파벳의 아스키코드 최솟값인 'A'를 빼주면 된다. (0~25)  

이제 alpha값이 높은 알파벳 순으로 9부터 0까지 수를 할당해주면 된다.  

위의 예제에서는 A, C, D, G, E, B, F 순으로 alpha가 높으므로,  

A = 9, C = 8, D = 7, G = 6, E = 5, B = 4, F = 3으로 할당해주면 된다.

```c++

#include <iostream>
#include <vector>
#include <string>
#include <cmath>
using namespace std;
void init()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
}

int main(void)
{
	init();
	int n;
	cin >> n;
	vector<string> word(n);
	vector<int> alpha(26);
	vector<int> val(26);
	for (int i = 0; i < n; i++)
	{
		// 입력
		string tmp;
		cin >> tmp;
		word[i].resize(tmp.size());
		// 글자 카운트 (자리 별 가중치를 곱해주기 편하게 역순으로 저장)
		for (int j = 0; j < tmp.size(); j++)
		{
			word[i][j] = tmp[tmp.size() - j - 1];
		}
		// 글자의 영향력을 저장
		for (int j = 0; j < word[i].size(); j++)
		{
			alpha[word[i][j] - 65] += pow(10, j);
		}
	}
	// 가장 큰 영향력을 가진 알파벳부터 9 ~ 0까지 부여한다.
	bool check[26] = { false };
	for (int i = 9; i > 0; i--)
	{
		int maxAlpha = -1;
		int maxAlphaIdx = -1;
		for (int j = 0; j < 26; j++)
		{
			if (maxAlpha < alpha[j] && !check[j])
			{
				maxAlphaIdx = j;
				maxAlpha = alpha[j];
			}
		}
		val[maxAlphaIdx] = i;
		check[maxAlphaIdx] = true;
	}
	// 곱하고 더해서 답 산출
	int sum = 0;
	for (int i = 0; i < 26; i++)
	{
		sum += val[i] * alpha[i];
	}
	cout << sum;
	return 0;
}

```
<br>