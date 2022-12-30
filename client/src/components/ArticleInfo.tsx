import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { IData, IPage } from "../interface";
import Parser from "html-react-parser";
import Button from "./button";

const Main = styled.main`
  width: 60%;
  margin: 0 auto;
`;

const ArticleContainer = styled.div`
  padding: 100px 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
`;

const ArticleTitle = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 80px;
`;
const ArticleText = styled.div`
  font-size: 17px;
  line-height: 1.3;
`;

const ButtonBox = styled.div`
  button {
    margin-right: 10px;
  }
`;

export default function ArticleInfo({ page }: IPage) {
  const [data, setData] = useState<IData>();
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/${page}/${id}`)
      .then((response) => setData(response.data[0]));
  }, []);

  const deleteClick = () => {
    if (window.confirm("정말로 삭제 하시겠습니까?")) {
      axios.delete(`http://localhost:8000/${page}/${id}`).then(() => {
        navigate(`/${page}`);
      });
    } else {
      return;
    }
  };
  const editClick = () => navigate("edit");
  return (
    <Main>
      <ArticleContainer>
        <ArticleTitle>{data?.title}</ArticleTitle>
        <ArticleText>{Parser(data?.content || "")}</ArticleText>
      </ArticleContainer>
      <ButtonBox>
        <Button onClick={deleteClick} text="삭제" />
        <Button onClick={editClick} text="수정" />
      </ButtonBox>
    </Main>
  );
}
