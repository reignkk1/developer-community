import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IData, IPage } from "../interface";
import Parser from "html-react-parser";

const Main = styled.main`
  width: 60%;
  margin: 0 auto;
`;

const ArticleContainer = styled.div`
  padding: 100px 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
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

export default function ArticleInfo({ page }: IPage) {
  const [data, setData] = useState<IData>();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/${page}/${id}`)
      .then((response) => setData(response.data[0]));
  }, []);
  console.log(data);

  return (
    <Main>
      <ArticleContainer>
        <ArticleTitle>{data?.title}</ArticleTitle>
        <ArticleText>{Parser(data?.content || "")}</ArticleText>
      </ArticleContainer>
    </Main>
  );
}
