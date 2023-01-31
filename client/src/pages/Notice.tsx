import styled from "@emotion/styled";
import { props } from "../interface";
import PagesTitle from "../components/PagesTitle";
import PagesArticle from "../components/PagesArticle";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { logined } from "../atom";

const Main = styled.main`
  width: 900px;
  margin: 0 auto;
`;

export default function Notice() {
  const navigate = useNavigate();
  const loginState = useRecoilValue(logined);
  const onClick = () => {
    loginState ? navigate("write") : navigate("/login");
  };
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
