import styled from "@emotion/styled";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

// File
import { IArticle, IArticleData } from "../interface";
import { ErrorBox, LoadingBox } from "./LoadingError";

// =============================================================================

const Container = styled.div`
  height: 480px;
`;
const ListBox = styled.ul`
  padding: 5px;
`;
const ListItem = styled.li`
  padding: 15px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;
const ListTitle = styled.div`
  margin-bottom: 5px;
  font-weight: bold;
  opacity: 0.9;

  a {
    display: block;
    height: 20px;
    color: ${(props) => props.theme.textColor};
    &:hover {
      color: #0092fa;
    }
    display: block;
    width: 410px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
const ListDate = styled.div`
  opacity: 0.9;
  font-size: 13px;
`;
const Title = styled.div`
  background-color: ${(props) => props.theme.bgTitleColor};
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 25px;
  height: 70px;
`;
const Img = styled.img`
  width: 40%;
  height: 80px;
`;
const TitleName = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: ${(props) => props.theme.textColor};

  &:hover {
    color: #0092fa;
  }
`;

const NicknameBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;
const Avartar = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 5px;
`;
const Nickname = styled.div`
  font-size: 14px;
  margin-right: 7px;
  color: ${(props) => props.theme.textColor};

  &:hover {
    color: #0092fa;
  }
`;

// =============================================================================

export default function ArticleBox({ ImgeSrc, name, page }: IArticle) {
  const { isLoading, error, data } = useQuery<IArticleData[]>(
    `Home${page}`,
    () =>
      axios
        .get(`http://localhost:8000/${page}`, { withCredentials: true })
        .then((response) => response.data)
  );

  return (
    <Container>
      <Link to={`/${page}`}>
        <Title>
          <TitleName>{name}</TitleName>
          <Img src={ImgeSrc} />
        </Title>
      </Link>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <ErrorBox />
      ) : (
        <ListBox>
          {data?.slice(0, 5).map((item) => (
            <ListItem key={item.id}>
              <NicknameBox>
                <Link to={`/user/${item.writerID}/posts`}>
                  <Avartar src="https://graph.facebook.com/555897032021233/picture?width=100&height=100" />
                </Link>
                <Link to={`/user/${item.writerID}/posts`}>
                  <Nickname>{item.nickname}</Nickname>
                </Link>
                <ListDate>- {item.date}</ListDate>
              </NicknameBox>
              <ListTitle>
                <Link to={`/${page}/${item.id}`}>{item.title}</Link>
              </ListTitle>
            </ListItem>
          ))}
        </ListBox>
      )}
    </Container>
  );
}
