import styled from "@emotion/styled";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { IArticleInfo, IData, IPage } from "../interface";
import Parser from "html-react-parser";
import Button from "./button";
import { useQuery } from "react-query";
import { logined } from "../atom";
import { useRecoilValue } from "recoil";
import CommentWrite from "./CommentWrite";

const Main = styled.main`
  width: 60%;
  margin: 0 auto;
`;

const ArticleContainer = styled.div`
  padding: 40px 0px;
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
  line-height: 2;
`;

const ButtonBox = styled.div`
  button {
    margin-right: 10px;
  }
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

  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserBox = styled.div`
  display: flex;
  margin-bottom: 30px;
  align-items: center;
`;
const Avartar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;
const NicknameBox = styled.div``;
const Nickname = styled.div`
  margin-bottom: 5px;
`;
const Date = styled.div`
  font-size: 14px;
`;

export default function ArticleInfo({ page }: IPage) {
  const { isLoading, error, data } = useQuery<IArticleInfo>(
    `Detail${page}`,
    () =>
      axios
        .get(`http://localhost:8000/${page}/${id}`, { withCredentials: true })
        .then((response) => {
          console.log(response);
          return response.data;
        })
  );

  const loginState = useRecoilValue(logined);

  const { id } = useParams();

  const navigate = useNavigate();

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
        {isLoading ? (
          <Loading>
            <img src="/img/loading.gif" alt="로딩중" />
          </Loading>
        ) : error ? (
          <Error>404 Not Found</Error>
        ) : (
          <>
            <UserBox>
              <Avartar src="https://graph.facebook.com/555897032021233/picture?width=100&height=100" />
              <NicknameBox>
                <Nickname>{data?.user[0].nickname}</Nickname>
                <Date>{data?.user[0].date}</Date>
              </NicknameBox>
            </UserBox>
            <ArticleTitle>{data?.user[0].title}</ArticleTitle>
            <ArticleText>{Parser(data?.user[0].content || "")}</ArticleText>
          </>
        )}
      </ArticleContainer>
      {loginState && data?.writerMatch ? (
        <ButtonBox>
          <Button onClick={deleteClick} text="삭제" />
          <Button onClick={editClick} text="수정" />
        </ButtonBox>
      ) : null}
      <CommentWrite loginState={loginState} />
    </Main>
  );
}
