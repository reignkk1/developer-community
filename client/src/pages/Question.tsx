import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

// File
import { logined } from "../atom";
import Button from "../components/button";
import PagesArticle from "../components/page/PagesArticle";
import PagesTitle from "../components/page/PagesTitle";
import { Main } from "../styles/PageShareStyle";

// =============================================================================

export default function Questions() {
  const loginState = useRecoilValue(logined);
  const navigate = useNavigate();
  const onClick = () => {
    loginState ? navigate("write") : navigate("/login");
  };
  return (
    <Main>
      <PagesTitle
        name="Q & A"
        ImgeSrc="https://okky.kr/questions.svg"
        explain="좋은 질문과 답변으로 동료의 시간을 아껴주세요."
      />
      <Button onClick={onClick} text="✏️질문하기" />
      <PagesArticle page="question" />
    </Main>
  );
}
