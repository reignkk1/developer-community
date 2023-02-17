import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

// File
import Button from "../components/button";
import PagesArticle from "../components/PagesArticle";
import PagesTitle from "../components/PagesTitle";
import { props } from "../interface";
import { logined } from "../atom";
import { Main } from "./../PageShareStyle";

// =============================================================================

export default function Life() {
  const loginState = useRecoilValue(logined);
  const navigate = useNavigate();
  const onClick = () => {
    loginState ? navigate("write") : navigate("/login");
  };
  return (
    <Main>
      <PagesTitle
        name="사는얘기"
        ImgeSrc={props.ImgeSrc.life}
        explain="삶과 애환에 관한 다양한 이야기를 나누는 공간입니다."
      />
      <Button onClick={onClick} text="✏️작성하기" />
      <PagesArticle page={props.page.life} />
    </Main>
  );
}
