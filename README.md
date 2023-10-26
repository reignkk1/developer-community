<div align="center">
  <h1 color:green>🚀 DEVELOPER Community</h1>
  
  <a href="https://web-board-web-6g2llexw0nts.sel3.cloudtype.app/">[🌍 배포 링크]</a>
</div>

<hr/>
<br />

## 프로젝트 소개 

- 제목 : 개발자들을 위한 지식공유 플랫폼
- 기간 : 2023.01.27 ~ 현재

<br />

## 사용 기술

- `React` `Typescript` `Recoil` `React-query`
-  `Node.js` `Express` `MySQL`
-  `AWS S3` `AWS RDS` `CloudType`

<br />

##  구현 기능 

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
- [x] 반응형 

<br />

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


