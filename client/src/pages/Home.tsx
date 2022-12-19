import styled from "@emotion/styled";
import axios from "axios";
import ArticleBox from "../components/ArticleBox";
import { useState, useEffect } from "react";
import { IData } from "../interface";
import { useRecoilState } from "recoil";
import { noticeGet } from "../atom";

const Main = styled.main`
  border: 1px solid black;
  width: 60%;
  height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;
`;

const ArticleType = {
  notice: "https://okky.kr/notice.svg",
  questions: "https://okky.kr/questions.svg",
  life: "https://okky.kr/community.svg",
  quotes: "https://okky.kr/knowledge.svg",
};

export default function Home() {
  const [noticeData, setNoticeData] = useRecoilState(noticeGet);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/notice/get")
      .then((response) => setNoticeData(response.data));
  }, []);

  return (
    <Main>
      <ArticleBox
        type={ArticleType.notice}
        name="공지사항"
        href="/notice"
        data={noticeData}
      />
      <ArticleBox type={ArticleType.questions} name="Q & A" href="/questions" />
      <ArticleBox type={ArticleType.life} name="사는얘기" href="/life" />
      <ArticleBox type={ArticleType.quotes} name="오늘의 명언" href="/quote" />
    </Main>
  );
}
