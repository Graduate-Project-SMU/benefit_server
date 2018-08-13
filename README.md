# Benefit Server

## Swagger

### Setting

1. swagger-ui 설치

```bash
$ npm install swagger-ui --save
```

2. node_modules/swagger-ui/dist 변경

swagger-ui 설치 후 node_modules/swagger-ui/dist를 확인해보면 내용물이 있는데 현재 swagger-ui는 버전이 3이상
이므로 버전이 2인 swagger-ui를 다운받아 dist의 내용물을 교체하도록 한다.
https://github.com/swagger-api/swagger-ui/tree/v2.2.10 

3. app.js 라우팅 추가

```javascript
// app.js
app.use('/swagger-ui', express.static(path.join(__dirname, './node_modules/swagger-ui/dist')));
```

### Swagger-spec 추가

1. app.js에 Swagger-spec 라우팅 추가

```javascript
//app.js
//영어 버전
app.use('/v1/swagger.json', function(req, res) {
  res.json(require('./swagger/swagger.json'));
});
```

```javascript
//app.js
//한글 버전
app.use('/v1/swagger-hangul.json', function(req, res) {
  res.json(require('./swagger/swagger-hangul.json'));
});
```

2.app.js 라우팅 리다이렉션

```javascript
//app.js
//영어 버전
app.use('/swagger', function(req, res) {
  res.redirect('/swagger-ui?url=/v1/swagger.json');
});
```

```javascript
//app.js
//한글 버전
app.use('/swagger-hangul', function(req, res) {
  res.redirect('/swagger-ui?url=/v1/swagger-hangul.json');
});
```

### Usage

* url/swagger -> swagger 영문 버전
* url/swagger-hangul -> swagger 한글 버전

---

## NGINX (Reverse Proxy 서버 구축)

### Feature
1. 비동기 이벤트 기반의 웹서버 소프트웨어
2. 더 작은 자원으로 가볍고 높은 성능으로 빠르게 서비스를 제공하는 것이 목표
3. 적은 쓰레드로 사용자 Request 처리

### Reverse Proxy Server
![image]('./img/ReverseProxy.png')

1. 클라이언트에서 Origin Server에 직접 접속 할 수 없으므로 높은 보안성
2. 한개의 Reverse Proxy Server에서 여러개의 Origin Server를 가질 수 있으므로 Load Balancing이 쉬워짐

### Setting
1. EC2 보안그룹(인바운드) 포트 열기
2. EC2 nginx 설치
  ```bash
  $ sudo apt update -y && sudo apt-get install nginx -y
  ```
  혹은
  ```bash
  $ sudo apt update && sudo apt-get install nginx
  ```
3. nginx가 제대로 설치되었나 확인
  ```bash
  $ sudo systemctl status nginx
  ```
  혹은
  ```bash
  $ sudo nginx -v
  ```
4. nginx 시작 및 재시작해도 자동으로 시작되게 설정
  ```bash
  $ sudo systemctl start nginx
  $ sudo systemctl enable nginx
  ```
5. nginx 설정파일 수정
  ```bash
  $ sudo vim /etc/nginx/sites-available/default 
  ```
