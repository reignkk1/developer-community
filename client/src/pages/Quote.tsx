import styled from "@emotion/styled";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PagesTitle from "../components/PagesTitle";
import { IData, props } from "../interface";

const Main = styled.main`
  width: 60%;
  margin: 0 auto;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 50px;
`;

const Input = styled.input`
  width: 92%;
  height: 40px;
  outline: none;
  border: 2px solid #0092fa;
  font-size: 16px;
  padding: 0px 10px;
  font-weight: bold;
`;

const Btn = styled.button`
  width: 8%;
  background-color: #0092fa;
  border: none;
  cursor: pointer;
  font-size: 16px;
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
      <InputContainer>
        <Input onChange={onChange} value={inputData} />
        <Btn onClick={onClick}>작성</Btn>
      </InputContainer>

      <ListBox>
        {data?.map((item) => (
          <ListItem>
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
