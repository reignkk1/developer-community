import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

// File

import Button from "../components/common/button";
import PagesArticle from "../components/category/articles/Articles";
import PagesTitle from "../components/category/title/Title";
import { Main } from "../styles/PageShareStyle";
import { loginUserInfoGet } from "../atom";

// =============================================================================

export default function Questions() {
  const loginUser = useRecoilValue(loginUserInfoGet);

  const navigate = useNavigate();
  const onClick = () => {
    loginUser ? navigate("write") : navigate("/login");
  };
  return (
    <Main>
      <PagesTitle
        name="Q & A"
        explain="좋은 질문과 답변으로 동료의 시간을 아껴주세요."
      />
      <Button onClick={onClick}>✏️질문하기</Button>
      <PagesArticle page="question" />
    </Main>
  );
}
