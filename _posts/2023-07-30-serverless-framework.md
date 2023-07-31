---
layout: post
title: "Serverless Framework 설치, 사용방법"
category: AWS
author: jihak
create_date: "2023-06-23"
preview: serverless framework 사용방법 
image_url: "https://user-images.githubusercontent.com/48908552/257203517-2ca921b7-f181-40fe-834a-f0883b0a303e.png"
---

<br>

# Serverless Framework?

쉽게 serverless 개발을 할 수 있게 해주는 프레임워크 입니다.   
serverless 기술인 lambda, dynamodb, api gateway 등을 쉽게 정의하고 배포 가능합니다.   
AWS에서는 Cloudformation 기반으로 만들어집니다.   

또 추가적인 기능으로는 쉽게 debugging 하고 api gateway에 대해 쉽게 파해칠 수 있는 도구가 있습니다.     


# 설치 방법

## node.js 설치
먼저 node.js가 깔려있어야합니다.

<a href="https://nodejs.org/ko">https://nodejs.org/ko</a>   

여기서 자신의 운영체제에 맞는 버전을 깔아주도록 합니다.

## Serverless Framework 설치
그 다음에는 npm을 이용해서 설치를 진행해 줍니다
```
npm install -g serverless
```
-g option을 이용해 global로 설치해줍니다.   

이제 service를 만들어봅시다.

터미널에 serverless라고 입력해줍니다.   
```
serverless
```
![Alt text](https://user-images.githubusercontent.com/48908552/257054556-90bd270d-6f6d-48b9-a2ab-ecd303af2ced.png)   
이런식으로 뜨면 원하는 template을 선택해주고 프로젝트의 이름을 정해주면 설치가 진행됩니다.   

```
cd your-service-name
```
directory로 들어가줍니다.

## IAM 설정
이제 배포를 하기전에 aws credential을 설정해줘야합니다.

aws 계정이 있으면 로그인을 해주고 없으면 회원가입을 해줍니다.   
그리고 나서 IAM사용자로 들어가서 IAM 계정을 만들어줍니다.

사용자 -> 보안 자격증명에 들어가준 후 액세스 키를 만들어 줍니다.

이 액세스 키는 __절대로 공유 해서는 안됩니다__!!!!


## AWS CLI 설치

이제 AWS CLI를 설치해줍니다.

<a href="https://docs.aws.amazon.com/ko_kr/cli/latest/userguide/getting-started-install.html">https://docs.aws.amazon.com/ko_kr/cli/latest/userguide/getting-started-install.html </a>

위 링크에 들어가서 운영체제에 맞는 방식으로 aws cli를 설치해줍니다.   

설치가 완료된 뒤 
```sh
aws
```
를 입력해서 설치가 잘 되었는지 확인해 줍니다.

이제 
```sh
aws configure
```
를 입력하여 사용자 설정을 해줍니다.

위에서 발급받은 액세스 키를 입력해줍니다.

## 배포 

```sh
serverless deploy
```
입력해주면 배포가 진행됩니다.   
그리고 알맞은 region에 들어가 보면 cloudformation에 템플릿으로 있는 것을 할 수 있습니다.   

    

<br>    
이러한 방법으로 serverless framework를 이용하여 쉽게 serverless 개발을 할 수 있습니다.    
serverless.yml 파일 작성하는 문법이 어려울 수도 있지만 공식문서에 잘 나와있고 <a href="https://github.com/serverless/examples">https://github.com/serverless/examples</a>    

그리고 여기에 예제들이 잘 나와있어서 참고하면 될 듯합니다.