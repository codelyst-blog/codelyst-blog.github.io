---
layout: post
title: "Serverless Framework Offline 개발환경 세팅 방법"
category: AWS
author: jihak
create_date: "2023-08-02"
preview: serverless framework를 aws에서 항상 배포하지 않고 local, offline에서 개발할 수 있도록 도와주는 serverless framework offline의 개발환경 세팅 방법에 대해 정리했습니다.
image_url: "https://user-images.githubusercontent.com/48908552/257203517-2ca921b7-f181-40fe-834a-f0883b0a303e.png"
---

<br>

저번 글에서는 serverless framework의 개발환경 세팅 방법에 대해 포스팅했습니다.    
__<a href="https://codelyst-blog.github.io/2023-07-30-serverless-framework">Serverless Framework 설치, 사용방법</a>__    

하지만 개발을 할 때 항상 serverless deploy를 하면서 배포, 테스트, 수정을 하면 시간이 오래 걸립니다. 따라서 개발시간 단축을 위해서 local에서 동작하도록 하는 것이 필요합니다.   

이를 위해서 serverless framework에서도 local로 개발환경을 세팅할 수 있도록 되어있습니다.

저번 포스팅 때 세팅한 개발환경은 다 되어있다고 생각하고 진행하겠습니다.

### Add Serverless Offline 


`npm install serverless-offline --save-dev`
을 통해서 설치를 진행해줍니다.

그리고 serverless.yml 파일에 
```
plugins:
  - serverless-offline
```
위 내용을 추가해줍니다.


`serverless --verbose` 이 명령어를 통해서 성공적으로 설치되었는지 확인해 줍니다.

### Usage and command line options
`serverless offline` 또는 `sls offline`을 입력하여 project를 offline에서 실행시킬수 있습니다. (powershell은 sls가 안됩니다.)

```
custom:
  serverless-offline:
    httpsProtocol: "dev-certs"
    httpPort: 4000
    stageVariables:
      foo: "dev"
```
serverless.yml파일에 추가해서 이런식으로 serverless에 대한 option들을 수정할 수 있습니다.
- default는 http://localhost:3000/ 입니다
- Content-Type header가 설정되지 않았을 경우 default로 applicaiton/json이 됩니다. 

### Docker layer 사용
```
custom:
  serverless-offline:
    useDocker: true
```
serverless offline환경에서 Docker layer를 사용하고 싶으면 serverless.yml 파일에서 useDocker: true로 줍니다.

AWS 역할에 권한을 주려면 다음의 policy를 주면 됩니다.
```json	
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "lambda:GetLayerVersion",
      "Resource": "arn:aws:lambda:*:*:layer:*:*"
    }
  ]
}
```


<br>

이 외에도 JWT authorizers, API gateway, Env값들에 대해서는 
<a href="https://www.serverless.com/plugins/serverless-offline">https://www.serverless.com/plugins/serverless-offline</a> 다음의 공식문서에 나와있습니다. 

<br>
이런식으로 개발환경을 세팅하여 serverless를 offline에서 쉽게 개발할 수 있습니다.