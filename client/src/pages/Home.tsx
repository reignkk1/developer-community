import styled from "@emotion/styled";
import ArticleBox from "../components/HomeArticleBox";
import { props } from "../interface";

const Main = styled.main`
  width: 60%;
  height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 50px;
`;

export default function Home() {
  return (
    <Main>
      <ArticleBox
        ImgeSrc={props.ImgeSrc.notice}
        name={props.name.notice}
        page={props.page.notice}
      />
      <ArticleBox
        ImgeSrc={props.ImgeSrc.question}
        name={props.name.question}
        page={props.page.question}
      />
      <ArticleBox
        ImgeSrc={props.ImgeSrc.life}
        name={props.name.life}
        page={props.page.life}
      />
      <ArticleBox
        ImgeSrc={props.ImgeSrc.quote}
        name={props.name.quote}
        page={props.page.quote}
      />
    </Main>
  );
}
