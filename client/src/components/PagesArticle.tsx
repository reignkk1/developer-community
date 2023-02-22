import styled from "@emotion/styled";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

// File
import { IArticleData, IPage } from "../interface";
import { ErrorBox, LoadingBox } from "./LoadingError";
// =============================================================================

const ListBox = styled.ul``;
const ListItem = styled.li`
  padding: 20px 0px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;
const ListTitle = styled.div`
  font-weight: bold;
  opacity: 0.9;
  margin-bottom: 10px;
  color: ${(props) => props.theme.textColor};
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
  margin-bottom: 10px;
  a {
    display: block;
    color: ${(props) => props.theme.textColor};
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
    <LoadingBox />
  ) : error ? (
    <ErrorBox />
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
