# node-mecab-ko
dockerfile node-mecab-ko에 대한 demo repository입니다.

# 사용되는 주요 모듈
- 아래 라이브러리는 발전이 멈춘상태, 하지만 사용하기에는 문제없음
- [mecab-ffi](https://www.npmjs.com/package/mecab-ffi)

# API documentation

https://www.getpostman.com/collections/b2aac91d8c241e30b4fa

- /api/mecab
- /api/mecab/dice
- /api/mecab/nouns



# 개발하기

### 처음에만

``` bash
docker-compose up --build -d
```

### 개발시에

```
docker-compose start
```

### 소스코드 변경시

src를 volumes로 연결해버렸기에 그냥 refresh가 자동으로 됨

### 라이브러리 변경시

``` bash
docker exec node-mecab-ko-demo npm add --save {어쩌고 저쩌고}
docker exec node-mecab-ko-demo npm add --save-dev {어쩌고 저쩌고}
docker exec node-mecab-ko-demo pm2 restart all
```

# 주의
- docker 에서 npm install 하는건 괜찮은데 container가 아닌 환경에서 npm install하면 신경 안씀.
- 뭘 하든 동작은 container에서 해야합니다.

# 이 데모를 사용하는 여러분이 하셨으면 하는 것...

- circleci에 배포할 때 마다 container 를 매번 구울 수 있도록. tag는 commit_id를 달 도록...
- cicd에서 docker image빌드 할 때에 cache를 사용하여 더욱 빨리 빌드 되도록
