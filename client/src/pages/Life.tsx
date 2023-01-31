import styled from "@emotion/styled";
import Button from "../components/button";
import PagesArticle from "../components/PagesArticle";
import PagesTitle from "../components/PagesTitle";
import { props } from "../interface";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { logined } from "../atom";

const Main = styled.main`
  width: 900px;
  margin: 0 auto;
`;
export default function Life() {
  const loginState = useRecoilValue(logined);
  const navigate = useNavigate();
  const onClick = () => {
    loginState ? navigate("write") : navigate("/login");
  };
  return (
    <Main>
      <PagesTitle
        name={props.name.life}
        ImgeSrc={props.ImgeSrc.life}
        explain="삶과 애환에 관한 다양한 이야기를 나누는 공간입니다."
      />
      <Button onClick={onClick} text="✏️작성하기" />
      <PagesArticle page={props.page.life} />
    </Main>
  );
}
