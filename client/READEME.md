## 의존성 파일

<p>/src/sectionData.json</p>
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
