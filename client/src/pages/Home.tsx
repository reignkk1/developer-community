import styled from "@emotion/styled";
import ArticleBox from "../components/home/articleBox/ArticleBox";
import Category from "../components/home/categoryTitle/Category";
import { Main } from "../styles/PageShareStyle";

// =============================================================================

const Container = styled(Main)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 50px;
`;

// =============================================================================

export default function Home() {
  return (
    <Container>
      <div>
        <Category to="/notice">공지사항</Category>
        <ArticleBox page="notice" />
      </div>
      <div>
        <Category to="/question">Q & A</Category>
        <ArticleBox page="question" />
      </div>
      <div>
        <Category to="/life">사는 얘기</Category>
        <ArticleBox page="life" />
      </div>
      <div>
        <Category to="/quote">오늘의 명언</Category>
        <ArticleBox page="quote" />
      </div>
    </Container>
  );
}
