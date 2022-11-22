# README for Team 7zip [Backend]

## 백엔드서버 및 DB 구성

- 전체

  - Docker 기반 백엔드 서버 환경 구축

  <br>

- 백엔드서버 (port: 3000)

  - 프레임워크: nest.js

  - 주요 적용사항 (라이브러리 등)

    - TypeScript
    - prettier, eslint
    - prisma(DB ORM)
    - swagger

  <br>

- DB 서버

  - MySQL (port: 3306)

    <br>

- 네트워크

  - webnet

<br><br>

## 개발환경 구축 가이드

# DB & 백엔드 로컬 환경 구축

<br>

## 1. Docker 설치

- https://www.docker.com \
  운영체제에 맞는 docker 다운로드 및 설치

- 터미널(cmd 등)에서 정상 설치 확인

```
$ docker -v
Docker version 20.10.17, build 100c701
```

<br>

## 2. GitLab clone

(작업 중인 파일 있는 경우 덮어써지지 않도록 주의!)

```
$ git clone https://kdt-gitlab.elice.io/ai_track/class05/ai_project/team07/7zip.git
$ cd 7zip
$ git checkout -t origin/back
Switched to a new branch 'back'
branch 'back' set up to track 'origin/back'.
```

<br>

## 3. 벡엔드 환경파일 작성

- ./back 경로에 `.env` 파일을 작성한다.
- 내용은 아래와 같다. \
  (복붙하세요~~)

```
SERVER_PORT=3000
DB_DIALECT=mysql
MYSQL_USERNAME= team07
MYSQL_PASSWORD= pwteam07
MYSQL_DATABASE= market
MYSQL_HOST=localhost
MYSQL_PORT=3306
DATABASE_URL=mysql://root:pwteam07@localhost:3306/market
JWT_SECRET_KEY=6ASFASDADASQWXCZX
SEQUELIZE_LOGGING=false
NODE_ENV=development
```

<br>

## 4. 백엔드 라이브러리 설치

- node.js가 설치되어 있지 않으면 먼저 설치한다.

```
$ cd back
$ npm install
```

<br>

## 5. `docker-compose` 의 `development` 실행

- 백엔드 서버, MySQL DB 컨테이너 생성 및 실행

  ```bash
  // log 보이게 실행
  $ docker-compose up dev

  // 백그라운드 실행
  $ docker-compose up -d dev
  ```

- 에러 발생 시 참고

  [https://stackoverflow.com/questions/60607976/error-eacces-permission-denied-unlink-usr-local-bin-npm](https://stackoverflow.com/questions/60607976/error-eacces-permission-denied-unlink-usr-local-bin-npm)

<br>

## 6. docker 실행 확인

- A, B 중 하나만 해도 됨

- A. 다른 터미널을 열어서

```bash
$ docker ps -a
CONTAINER ID   IMAGE      COMMAND                  CREATED         STATUS         PORTS                                            NAMES
59ff79bc77f5   back-dev   "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes   0.0.0.0:3000->3000/tcp, 0.0.0.0:9229->9229/tcp   nestjs_api_dev
3df52e3055b3   mysql:8    "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes   0.0.0.0:3306->3306/tcp, 33060/tcp                mysql
```

- B. 윈도우에서 확인

![01](/.doc/img/01.png)
<br><br>
![02](/.doc/img/02.png)

## 7. chrome에서 [http://localhost:3000](http://localhost:3000/) 접속

![09](/.doc/img/09.png)

## 8. Swagger 접속 및 API 테스트

- http://localhost:3000/api/

<br>

## 9. DB 확인

- DBeaver 툴 사용
  https://dbeaver.io <br><br>
  ![07](/.doc/img/07.png)

<br>

## (참고) DB를 초기화하고 싶다면

- docker 컨테이너 삭제
  <br><br>
  ![08](/.doc/img/08.png)

- `db\mysql` 폴더 삭제 후

- 5번 다시 실행

<br>

<br>

<br><br>

---

# NestJS 기본 README

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
