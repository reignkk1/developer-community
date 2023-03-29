import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

// File
import PagesTitle from "../components/page/PagesTitle";
import PagesArticle from "../components/page/PagesArticle";
import Button from "../components/button/button";
import { logined } from "../atom";
import { Main } from "../styles/PageShareStyle";

// =============================================================================

export default function Notice() {
  const navigate = useNavigate();
  const loginState = useRecoilValue(logined);
  const onClick = () => {
    loginState ? navigate("write") : navigate("/login");
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
        ImgeSrc="https://okky.kr/notice.svg"
        explain="Developer의 새소식, 이벤트, 행사 정보를 공유하는 공간입니다."
      />
      {managerState === 1 ? (
        <Button onClick={onClick}>✏️작성하기</Button>
      ) : null}

      <PagesArticle page="notice" />
    </Main>
  );
}
