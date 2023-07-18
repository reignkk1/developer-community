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

export default function GuestBooks() {
  const { data: loginUser } = useGetAxios("/user/login-info");
  const setPage = useSetRecoilState(category);
  const queryClient = useQueryClient();

  const [inputData, setInputData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setPage("guest-book");
  }, [setPage]);

  const data = {
    title: inputData,
    content: inputData,
    date: new Date().toLocaleDateString("ko-kr"),
  };

  const onSuccess = () =>
    queryClient.invalidateQueries(["GET", "/article/guest-book/all"]);

  const { mutate: createQuote } = usePostAxios(
    "/article/guest-book",
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
      <PagesTitle name="방명록" explain="쓰셔도 되고 굳이 안 쓰셔도 됩니다" />
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
