import React, { useState } from "react";
import styled from "@emotion/styled";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

// File
import PagesTitle from "../components/PagesTitle";
import QuoteInput from "../components/QuoteInput";
import { IArticleData, props } from "../interface";
import { logined } from "../atom";
import { Main } from "../PageShareStyle";
import { ErrorBox, LoadingBox } from "../components/LoadingError";
import Avartar from "../components/Avartar";

// =============================================================================
const ListBox = styled.ul``;
const ListItem = styled.li`
  padding: 20px 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`;
const ListTitle = styled.div`
  font-weight: bold;
  opacity: 0.9;
  margin-bottom: 10px;
  &:hover {
    color: #0092fa;
  }
`;
const ListDate = styled.div`
  opacity: 0.9;
`;

const NicknameBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
`;

const Nickname = styled.div`
  font-size: 14px;
  margin-left: 5px;
  margin-right: 7px;
`;

// =============================================================================

export default function Quote() {
  const [loginState, setLoginState] = useRecoilState(logined);
  const { isLoading, error, data } = useQuery<IArticleData[]>("quote", () =>
    axios.get("/article/quote", { withCredentials: true }).then((response) => {
      if (response.data.logined) {
        setLoginState(true);
        return response.data.result;
      }
      setLoginState(false);
      return response.data.result;
    })
  );

  const [inputData, setInputData] = useState("");
  const navigate = useNavigate();

  const onClick = () => {
    if (!loginState) return navigate("/login");
    if (!inputData) {
      return alert("내용을 입력해주세요!");
    }
    axios
      .post(
        "/article/quote",
        {
          title: inputData,
          content: inputData,
          date: new Date().toLocaleDateString("ko-kr"),
        },
        { withCredentials: true }
      )
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
        ImgeSrc={props.ImgeSrc.quote}
        explain="명언 한 줄로 내 마음가짐을 단단하게 세워볼까요?"
      />
      <QuoteInput onChange={onChange} onClick={onClick} inputData={inputData} />
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <ErrorBox />
      ) : (
        <ListBox>
          {data?.map((item) => (
            <ListItem key={item.id}>
              <NicknameBox>
                <Avartar width="20px" heigth="20px" />
                <Nickname>{item.nickname}</Nickname>
              </NicknameBox>
              <Link to={`${item.id}`}>
                <ListTitle>{item.title}</ListTitle>
              </Link>

              <ListDate>{item.date}</ListDate>
            </ListItem>
          ))}
        </ListBox>
      )}
    </Main>
  );
}
