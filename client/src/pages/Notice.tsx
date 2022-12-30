import styled from "@emotion/styled";
import { props } from "../interface";
import PagesTitle from "../components/PagesTitle";
import PagesArticle from "../components/PagesArticle";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";

const Main = styled.main`
  width: 60%;
  margin: 0 auto;
`;

export default function Notice() {
  const navigate = useNavigate();
  const onClick = () => navigate("write");
  return (
    <Main>
      <PagesTitle
        name={props.name.notice}
        ImgeSrc={props.ImgeSrc.notice}
        explain="OKKY의 새소식, 이벤트, 행사 정보를 공유하는 공간입니다."
      />
      <Button text="✏️작성하기" onClick={onClick} />
      <PagesArticle page={props.page.notice} />
    </Main>
  );
}
