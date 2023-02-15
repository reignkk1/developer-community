import styled from "@emotion/styled";
import ArticleBox from "../components/ArticleBox";
import { props } from "../interface";

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
      <ArticleBox
        ImgeSrc={props.ImgeSrc.notice}
        name="공지사항"
        page={props.page.notice}
      />
      <ArticleBox
        ImgeSrc={props.ImgeSrc.question}
        name="Q & A"
        page={props.page.question}
      />
      <ArticleBox
        ImgeSrc={props.ImgeSrc.life}
        name="사는얘기"
        page={props.page.life}
      />
      <ArticleBox
        ImgeSrc={props.ImgeSrc.quote}
        name="오늘의 명언"
        page={props.page.quote}
      />
    </Main>
  );
}
