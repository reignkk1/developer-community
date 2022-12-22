import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import { props } from "../interface";
import PagesTitle from "../components/PagesTitle";
import { useEffect, useState } from "react";
import axios from "axios";
import { IData } from "./../interface";
import PagesArticle from "../components/PagesArticle";

const Main = styled.main`
  width: 60%;
  margin: 0 auto;
`;

export default function Notice() {
  return (
    <Main>
      <PagesTitle
        name={props.name.notice}
        ImgeSrc={props.ImgeSrc.notice}
        explain="OKKY의 새소식, 이벤트, 행사 정보를 공유하는 공간입니다."
      />
      <Link to="write">공지사항 쓰기</Link>
      <PagesArticle page={props.page.notice} />
    </Main>
  );
}
