import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

// File
import { props } from "../interface";
import PagesTitle from "../components/PagesTitle";
import PagesArticle from "../components/PagesArticle";
import Button from "../components/button";
import { logined } from "../atom";

// =============================================================================

const Main = styled.main`
  width: 900px;
  margin: 0 auto;
`;

// =============================================================================

export default function Notice() {
  const navigate = useNavigate();
  const loginState = useRecoilValue(logined);
  const onClick = () => {
    loginState ? navigate("write") : navigate("/login");
  };
  const [managerState, setManagerState] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8000/manager-confirm", {
        withCredentials: true,
      })
      .then((response) => {
        setManagerState(response.data);
      });
  }, []);

  return (
    <Main>
      <PagesTitle
        name="공지사항"
        ImgeSrc={props.ImgeSrc.notice}
        explain="OKKY의 새소식, 이벤트, 행사 정보를 공유하는 공간입니다."
      />
      {managerState === 1 ? (
        <Button text="✏️작성하기" onClick={onClick} />
      ) : null}

      <PagesArticle page={props.page.notice} />
    </Main>
  );
}
