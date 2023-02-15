import styled from "@emotion/styled";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

// File
import { IArticleData, IPage } from "../interface";
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

const NicknameBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  a {
    display: block;
    &:hover {
      color: #0092fa;
    }
    margin-right: 5px;
  }
`;
const Avartar = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;
const Nickname = styled.div`
  font-size: 14px;
  margin-right: 7px;
`;

// =============================================================================

export default function PagesArticle({ page }: IPage) {
  const { isLoading, error, data } = useQuery<IArticleData[]>(
    `Page${page}`,
    () =>
      axios
        .get(`http://localhost:8000/${page}`, { withCredentials: true })
        .then((response) => response.data)
  );

  return isLoading ? (
    <Loading>
      <img src="/img/loading.gif" alt="로딩중" />
    </Loading>
  ) : error ? (
    <Error>404 Not Found</Error>
  ) : (
    <ListBox>
      {data?.map((item) => (
        <ListItem key={item.id}>
          <NicknameBox>
            <Link to={`/user/${item.writerID}/posts`}>
              <Avartar src="https://graph.facebook.com/555897032021233/picture?width=100&height=100" />
            </Link>
            <Link to={`/user/${item.writerID}/posts`}>
              <Nickname>{item.nickname}</Nickname>
            </Link>
          </NicknameBox>
          <Link to={`/${page}/${item.id}`}>
            <ListTitle>{item.title}</ListTitle>
          </Link>

          <ListDate>{item.date}</ListDate>
        </ListItem>
      ))}
    </ListBox>
  );
}
