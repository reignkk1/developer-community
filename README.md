# Developer Community

## 프로젝트 시작하게 된 이유

<<<<<<< HEAD
- CRUD 웹앱을 만들어보면서 프론트엔드와 백엔드의 전체적인 흐름을 알기 위해서 시작했습니다.
- 리액트의 생태계를 알고 익숙해지기 위해 컴포넌트 단위로 개발하는 것을 연습했습니다.

## 실행 방법

1. git clone
2. `npm install`
3. `cd client` 입력 후 `npm start` 프론트엔드 서버 실행
4. `cd server` 입력 후 `npm run dev` 백엔드 서버 실행

## 프로젝트 링크
=======
## 사용 기술
>>>>>>> c19b258ea03da31f693ae6e020dadff3697e7ffe

<a href="https://web-board-web-6g2llexw0nts.sel3.cloudtype.app/">[🌍 배포 링크]</a>

## What is React?

- Facebook에서 주도적으로 개발한 SPA(Single Page Application)를 효과적으로 구축하기 위해 사용하는 JavaScript 기반의 라이브러리이다.
- 프레임워크가 아니고 왜 라이브러리인지 추측해보자면 리액트는 컴포넌트 디자인 기능만을 제공하고 다른 기능들(라우팅 등등)은 포함하고 있지 않기 때문인 것 같다.

## React 등장 배경 이유

- 기존 JavaScript로 SPA를 개발해본 결과 코드가 너무 난잡해지고 방대해져 개발을 하기에 너무 고통스러웠다. 각각의 HTML 태그들에게 이벤트를 하나하나 바인딩해야 하고 상태에 따라서 변화하는 UI들을 관리하기가 매우 힘들었다. 이런 부분에 있어서 많은 개발자들이 React를 만든 이유인 것 같다.

## React의 특징

- 컴포넌트 기반의 UI

  - 컴포넌트 단위로 UI를 개발하며 마치 레고를 조립하듯이 각각의 부품들을 끼워맞춰 하나의 UI를 완성한다.
  - 각각의 로직들이 분리되고 쪼개어져 유지보수가 용이하고, 재사용성이 높아진다.

- 상태를 Props의 형태로 컴포넌트에 바인딩하며 자식 컴포넌트에게도 전달된다.
  - Props들을 따라가며 전체적인 데이터의 흐름을 파악하기 쉽다. (단방향 데이터의 흐름)

## React의 단점

컴포넌트들이 복잡해지고 서비스가 커질수록 자식 컴포넌트가 부모 컴포넌트의 상태를 바꾸는 경우가 생겼다.
양방향 데이터 흐름이 일어나면서 데이터의 흐름을 파악하기 어려웠다.(상태 관리 라이브러리로 해결)

### 🙎‍♂️ User

- [x] 회원가입
- [x] 로그인 / 로그아웃
- [x] 카카오 소셜 로그인
- [x] 유저 프로필 사진 업로드
- [x] 프로필 수정
- [x] 비밀번호 변경
- [x] 회원탈퇴
- [x] 유저 활동내역

### 📜 Post

- [x] 게시물 작성
- [x] 게시물 수정 / 삭제
- [x] 게시물 검색

### 💬 Comment

- [x] 댓글 생성
- [x] 댓글 삭제
- [x] 대댓글 기능

### etc

- [x] 다크모드 / 라이트모드
<<<<<<< HEAD
- [x] 반응형
=======
- [x] 반응형 

<br />

<p>client/src/sectionData.json</p>
<pre>
  <code>
    {
  "data": [
    {
      "path": "/notice",
      "title": "공지사항",
      "description": "Developer의 새소식, 이벤트, 행사 정보를 공유하는 공간입니다."
    },
    {
      "path": "/tech",
      "title": "Tech",
      "description": "기술 관련이나 CS지식을 적어주세요."
    },
    {
      "path": "/life",
      "title": "사는 얘기",
      "description": "삶과 애환에 관한 다양한 이야기를 나누는 공간입니다."
    },
    {
      "path": "/guest-book",
      "title": "방명록",
      "description": "어서오세요~!"
    }
  ]
}
  </code>
</pre>

- 컴포넌트들은 sectionData.json 파일에 의존하고 있습니다.
- 유지보수 및 확장성에 용이하도록 설계하였습니다.
- data 객체를 추가/수정할 때마다 메뉴/섹션 생성, 타이틀, 설명이 바뀝니다.


<p>Client - Pakage.json</p>
<pre>
  <code>
    {
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "dependencies": {
    "@emotion/css": "^11.10.5",
    "@emotion/react": "^11.10.5",
    "@emotion/styled": "^11.10.5",
    "@types/react": "^18.2.20",
    "@types/react-dom": "^18.0.9",
    "@types/react-router-dom": "^5.3.3",
    "axios": "^1.2.1",
    "html-react-parser": "^3.0.4",
    "quill-image-resize-module": "^3.0.0",
    "quill-image-resize-module-ts": "^3.0.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-error-boundary": "^4.0.11",
    "react-hook-form": "^7.41.2",
    "react-query": "^3.39.3",
    "react-quill": "^2.0.0",
    "react-router-dom": "6.4",
    "react-scripts": "5.0.1",
    "recoil": "^0.7.6",
    "recoil-persist": "^4.2.0",
    "typescript": "^4.9.3",
    "web-vitals": "^2.1.4"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^14.0.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^18.15.11",
    "axios-mock-adapter": "^1.21.5"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --transformIgnorePatterns \"node_modules/(?!axios)/\"",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
  </code>
</pre>

<p>Server - Pakage.json</p>

<pre>
  <code>
    {
  "dependencies": {
    "aws-sdk": "^2.1344.0",
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.20.1",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "express-mysql-session": "^2.1.8",
    "express-session": "^1.17.3",
    "memorystore": "^1.6.7",
    "multer": "^1.4.5-lts.1",
    "multer-s3": "^3.0.1",
    "mysql": "^2.18.1"
  },
  "name": "board-web",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "type": "module",
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "nodemon": "^2.0.20"
  },
  "engines": {
    "node": "16"
  }
}
  </code>
</pre>


>>>>>>> c19b258ea03da31f693ae6e020dadff3697e7ffe
