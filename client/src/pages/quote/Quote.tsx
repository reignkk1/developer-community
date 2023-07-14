import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// File
import PagesTitle from "../../components/category/title/Title";
import QuoteInput from "../../components/QuoteInput";

import { Main } from "../../styles/PageShareStyle";
import PagesArticle from "../../components/category/articles/Articles";
import { useGetAxios, usePostAxios } from "../../hooks/api/http";
import { useSetRecoilState } from "recoil";
import { category } from "../../atom";
import { useQueryClient } from "react-query";

// =============================================================================

export default function Quote() {
  const { data: loginUser } = useGetAxios("/user/login-info");
  const setPage = useSetRecoilState(category);
  const queryClient = useQueryClient();

  const [inputData, setInputData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setPage("quote");
  }, [setPage]);

  const data = {
    title: inputData,
    content: inputData,
    date: new Date().toLocaleDateString("ko-kr"),
  };

  const onSuccess = () =>
    queryClient.invalidateQueries(["GET", "/article/quote/all"]);

  const { mutate: createQuote } = usePostAxios(
    "/article/quote",
    data,
    onSuccess
  );

  const onClick = () => {
    if (!loginUser) return navigate("/login");
    if (!inputData) return alert("내용을 입력해주세요!");

    createQuote();
    setInputData("");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputData(e.target.value);
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
      <PagesArticle />
    </Main>
  );
}
