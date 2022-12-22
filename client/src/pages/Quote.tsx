import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import PagesArticle from "../components/PagesArticle";
import PagesTitle from "../components/PagesTitle";
import { props } from "../interface";
const Main = styled.main`
  width: 60%;
  margin: 0 auto;
`;
export default function Quote() {
  return (
    <Main>
      <PagesTitle
        name={props.name.quote}
        ImgeSrc={props.ImgeSrc.quote}
        explain="명언 한 줄로 내 마음가짐을 단단하게 세워볼까요?"
      />
      <Link to="write">명언 쓰기</Link>
      <PagesArticle page={props.page.quote} />
    </Main>
  );
}
