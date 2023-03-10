<div align="center">
  <h1 color:green>DEVELOPER</h1>
  
  <a href="https://web-board-web-6g2llexw0nts.sel3.cloudtype.app/">[바로가기]</a>
  
  
</div>


<hr/>

## Front-end

 `React` `Typescript` `Recoil` `React-query`
 
 ## Back-end

 `Node.js` `Express` `MySQL`

<hr/>

## 리뷰

> 1. 회원가입 / 로그인

- 유저는 아이디, 비밀번호, 이메일, 이름, 닉네임으로 회원가입 할 수 있습니다.
- 유저가 입력한 비밀번호는 `bcrypt`로 해쉬되어 DB에 저장됩니다.
- 회원가입 정보와 `session`은 DB에 저장되며 로그인시 `session`을 생성합니다.

<img  src="https://user-images.githubusercontent.com/87847136/224319222-9741d93f-c85e-4951-bd50-241452de2798.gif"/>

> 2. 게시물 작성 / 댓글 작성

- 로그인한 유저만 게시물과 댓글을 작성할 수 있습니다.
- 유저는 제목과 내용을 작성하여 게시물을 올릴수 있습니다.
- 유저는 댓글 내용을 입력하여 댓글을 작성할 수 있습니다.

<img src="https://user-images.githubusercontent.com/87847136/224324854-2830e47b-e1a5-42b7-afa8-56b91a40289c.gif"/>

> 3. 검색

- 유저는 키워드를 입력하여 제목을 검색할 수 있습니다.
- 검색된 제목에 유저가 입력한 키워드가 색칠됩니다.

<img src="https://user-images.githubusercontent.com/87847136/224325036-b9c5048c-de31-4356-8884-d8b44494248d.gif"/>

> 4. 다크모드

- 유저는 다크모드 클릭시 어두운 테마로 전환됩니다.

<img src="https://user-images.githubusercontent.com/87847136/224325105-2fce001f-546d-46b9-92f6-0eb5f431aaed.gif"/>

> 5. 댓글삭제 / 댓글수정

- 현재 로그인한 유저의 ID와 댓글을 쓴 유저의 ID가 같을경우 삭제/수정이 가능합니다.

<img src="https://user-images.githubusercontent.com/87847136/224325178-3a4c13fa-f0fd-438c-95f0-d68a28c7a817.gif"/>

> 6. 비밀번호 변경

- 유저는 현재 비밀번호를 입력하고 새비밀번호와 새비밀번호 확인을 입력하여 비밀번호를 변경할수 있습니다.
- 현재 비밀번호가 맞지 않다면 알림창을 띄웁니다.

<img src="https://user-images.githubusercontent.com/87847136/224325251-7cc6213d-72fe-4ba6-8701-a04b92a9c8dc.gif"/>

> 7. 유저 활동내역

- 유저가 쓴 게시물/댓글 내역을 볼수 있습니다.
- 해당 게시물/댓글 클릭시 이동합니다.

<img src="https://user-images.githubusercontent.com/87847136/224325320-00f3d67e-a565-4b34-ae9e-32e361662e89.gif"/>

> 8. 회원정보 변경

- 유저는 이름과 닉네임을 변경할수 있습니다.

<img src="https://user-images.githubusercontent.com/87847136/224325382-65e415d1-4dc7-4ea0-a56c-8fde65b2a57e.gif"/>

> 9. 회원탈퇴

- 유저는 회원탈퇴를 할수 있습니다.
- 회원탈퇴 시 해당 계정이 쓴 게시물과 댓글들은 삭제됩니다.

<img src="https://user-images.githubusercontent.com/87847136/224325430-29570c6c-8f1e-413d-9fc6-02596034e7ea.gif"/>

<hr/>

## 페이지

> root
- 홈, 검색, 로그인, 회원가입
> user
- 유저 게시물/댓글 활동내역
> article
- 공지사항, 사는얘기, Q&A, 오늘의 명언 / 글쓰기
> profile
- 내 프로필
> account
- 비밀번호 변경, 회원탈퇴
