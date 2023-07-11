import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

// File
import PagesTitle from "../components/category/title/Title";
import PagesArticle from "../components/category/articles/Articles";
import Button from "../components/common/button";
import { Main } from "../styles/PageShareStyle";
import { loginUserInfoGet } from "../atom";

// =============================================================================

export default function Notice() {
  const navigate = useNavigate();
  const loginUser = useRecoilValue(loginUserInfoGet);
  const onClick = () => {
    loginUser ? navigate("write") : navigate("/login");
  };
  const [managerState, setManagerState] = useState();

  useEffect(() => {
    axios.get("/manager-confirm").then((response) => {
      setManagerState(response.data);
    });
  }, []);

  return (
    <Main>
      <PagesTitle
        name="공지사항"
        explain="Developer의 새소식, 이벤트, 행사 정보를 공유하는 공간입니다."
      />
      {managerState ? <Button onClick={onClick}>✏️작성하기</Button> : null}

      <PagesArticle page="notice" />
    </Main>
  );
}
