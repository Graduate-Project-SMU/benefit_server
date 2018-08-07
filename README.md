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

2. Swagger-spec 작성(swagger.json, swagger-hangul.json)

3.app.js 라우팅 리다이렉션

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