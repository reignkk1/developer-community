import styled from "@emotion/styled";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PagesTitle from "../components/PagesTitle";
import QuoteInput from "../components/QuoteInput";
import { IData, props } from "../interface";

const Main = styled.main`
  width: 60%;
  margin: 0 auto;
`;

const ListBox = styled.ul``;
const ListItem = styled.li`
  padding: 30px 0px;
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

export default function Quote() {
  const [data, setData] = useState<IData[]>();
  const [inputData, setInputData] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/quote")
      .then((response) => setData(response.data));
  }, []);

  const onClick = () => {
    if (!inputData) {
      return alert("내용을 입력해주세요!");
    }

    axios
      .post("http://localhost:8000/quote", {
        title: inputData,
        date: new Date().toLocaleDateString("ko-kr"),
        writerID: 123,
      })
      .then(() =>
        axios
          .get("http://localhost:8000/quote")
          .then((response) => setData(response.data))
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
        name={props.name.quote}
        ImgeSrc={props.ImgeSrc.quote}
        explain="명언 한 줄로 내 마음가짐을 단단하게 세워볼까요?"
      />

      <QuoteInput onChange={onChange} onClick={onClick} inputData={inputData} />
      <ListBox>
        {data?.map((item) => (
          <ListItem key={item.id}>
            <Link to={`${item.id}`}>
              <ListTitle>{item.title}</ListTitle>
            </Link>

            <ListDate>{item.date}</ListDate>
          </ListItem>
        ))}
      </ListBox>
    </Main>
  );
}
