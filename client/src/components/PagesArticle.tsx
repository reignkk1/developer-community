import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { IData, IPage } from "../interface";

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

const Loading = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 60px;
    height: 60px;
  }
`;

const Error = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function PagesArticle({ page }: IPage) {
  const { isLoading, error, data } = useQuery<IData[]>(`${page}`, () =>
    axios
      .get(`http://localhost:8000/${page}`, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
  );
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8000/${page}`)
  //     .then((response) => setData(response.data));
  // }, []);

  return isLoading ? (
    <Loading>
      <img src="/img/loading.gif" />
    </Loading>
  ) : error ? (
    <Error>404 Not Found</Error>
  ) : (
    <ListBox>
      {data?.map((item) => (
        <ListItem key={item.id}>
          <Link to={`/${page}/${item.id}`}>
            <ListTitle>{item.title}</ListTitle>
          </Link>

          <ListDate>{item.date}</ListDate>
        </ListItem>
      ))}
    </ListBox>
  );
}
