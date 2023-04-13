import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// File
import PagesTitle from "../components/category/title/Title";
import QuoteInput from "../components/QuoteInput";
import { logined } from "../atom";
import { Main } from "../styles/PageShareStyle";
import PagesArticle from "../components/category/articles/Articles";

// =============================================================================

export default function Quote() {
  const loginState = useRecoilValue(logined);

  const [inputData, setInputData] = useState("");
  const navigate = useNavigate();

  const onClick = () => {
    if (!loginState) return navigate("/login");
    if (!inputData) {
      return alert("내용을 입력해주세요!");
    }
    axios
      .post("/article/quote", {
        title: inputData,
        content: inputData,
        date: new Date().toLocaleDateString("ko-kr"),
      })
      .then(() => alert("작성이 완료되었습니다!"));
    setInputData("");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  return (
    <Main>
      <PagesTitle
        name="오늘의 명언"
        explain="명언 한 줄로 내 마음가짐을 단단하게 세워볼까요?"
      />
      <QuoteInput
        onChange={onChange}
        onClick={onClick}
        inputData={inputData}
        btnText="작성"
      />
      <PagesArticle page="quote" />
    </Main>
  );
}
