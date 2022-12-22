import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import PagesArticle from "../components/PagesArticle";
import PagesTitle from "../components/PagesTitle";
import { props } from "../interface";

const Main = styled.main`
  width: 60%;
  margin: 0 auto;
`;
export default function Life() {
  return (
    <Main>
      <PagesTitle
        name={props.name.life}
        ImgeSrc={props.ImgeSrc.life}
        explain="삶과 애환에 관한 다양한 이야기를 나누는 공간입니다."
      />
      <Link to="write">사는얘기 쓰기</Link>
      <PagesArticle page={props.page.life} />
    </Main>
  );
}
