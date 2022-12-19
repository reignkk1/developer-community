import styled from "@emotion/styled";
import { noticeGet } from "../atom";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IData } from "../interface";

const Main = styled.main`
  width: 60%;
  margin: 0 auto;
`;

export default function ArticleInfo() {
  const [data, setData] = useState<IData>();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/notice/get/${id}`)
      .then((response) => setData(response.data[0]));
  }, []);
  console.log(data);

  return (
    <Main>
      <div>{data?.title}</div>
      <div>{data?.content}</div>
    </Main>
  );
}
