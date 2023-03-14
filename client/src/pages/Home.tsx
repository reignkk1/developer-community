import styled from "@emotion/styled";
import ArticleBox from "../components/home/ArticleBox";
import Category from "../components/home/Category";

// =============================================================================

const Main = styled.main`
  width: 950px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 50px;
`;

// =============================================================================

export default function Home() {
  return (
    <Main>
      <div>
        <Category
          imgeSrc="https://okky.kr/notice.svg"
          name="공지사항"
          page="notice"
        />
        <ArticleBox page="notice" />
      </div>
      <div>
        <Category
          imgeSrc="https://okky.kr/questions.svg"
          name="Q & A"
          page="question"
        />
        <ArticleBox page="question" />
      </div>
      <div>
        <Category
          imgeSrc="https://okky.kr/community.svg"
          name="사는 얘기"
          page="life"
        />
        <ArticleBox page="life" />
      </div>
      <div>
        <Category
          imgeSrc="https://okky.kr/knowledge.svg"
          name="오늘의 명언"
          page="quote"
        />
        <ArticleBox page="quote" />
      </div>
    </Main>
  );
}
