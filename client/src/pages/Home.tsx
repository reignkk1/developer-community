import styled from "@emotion/styled";
import ArticleBox from "../components/ArticleBox";

const Main = styled.main`
  width: 60%;
  height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 50px;
`;

const ArticleType = {
  notice: "https://okky.kr/notice.svg",
  question: "https://okky.kr/questions.svg",
  life: "https://okky.kr/community.svg",
  quotes: "https://okky.kr/knowledge.svg",
};

export default function Home() {
  return (
    <Main>
      <ArticleBox type={ArticleType.notice} name="공지사항" page="notice" />
      <ArticleBox type={ArticleType.question} name="Q & A" page="question" />
      <ArticleBox type={ArticleType.life} name="사는얘기" page="life" />
      <ArticleBox type={ArticleType.quotes} name="오늘의 명언" page="quote" />
    </Main>
  );
}
