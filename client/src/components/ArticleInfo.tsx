import styled from "@emotion/styled";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Parser from "html-react-parser";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";

// File
import Button from "./button";
import CommentWrite from "./CommentWrite";
import Comments from "./Comments";
import { logined } from "../atom";
import { IArticleInfo, IPage } from "../interface";
import { ErrorBox, LoadingBox } from "./LoadingError";
import { articleDetail } from "../axios";
import Avartar from "./Avartar";

// =============================================================================

const Main = styled.main`
  width: 60%;
  margin: 0 auto;
`;

const ArticleContainer = styled.div`
  padding: 40px 0px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 30px;
`;

const ArticleTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 80px;
`;
const ArticleText = styled.div`
  font-size: 16px;
  line-height: 1.7;
`;

const ButtonBox = styled.div`
  button {
    margin-right: 10px;
  }
`;
const UserBox = styled.div`
  display: flex;
  margin-bottom: 30px;
  align-items: center;
  a {
    margin-right: 10px;
  }
`;

const NicknameBox = styled.div`
  a {
    display: block;
    color: ${(props) => props.theme.textColor};
    &:hover {
      color: #0092fa;
    }
  }
`;
const Nickname = styled.div`
  margin-bottom: 5px;
`;
const Date = styled.div`
  font-size: 14px;
`;

// =============================================================================

export default function ArticleInfo({ page }: IPage) {
  const [loginState, setLoginState] = useRecoilState(logined);
  const { id } = useParams();
  const { isLoading, error, data } = useQuery<IArticleInfo>(
    `Detail${page}`,
    () =>
      articleDetail(page, id).then((response) => {
        if (response.data.logined) {
          setLoginState(true);
          return response.data;
        }
        setLoginState(false);
        return response.data;
      })
  );

  const navigate = useNavigate();

  const deleteClick = () => {
    if (window.confirm("정말로 삭제 하시겠습니까?")) {
      axios.delete(`/article/${page}/${id}`).then(() => {
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
          <LoadingBox />
        ) : error ? (
          <ErrorBox />
        ) : (
          <>
            <UserBox>
              <Link to={`/user/${data?.user[0].writerID}/posts`}>
                <Avartar width="50px" heigth="50px" />
              </Link>
              <NicknameBox>
                <Link to={`/user/${data?.user[0].writerID}/posts`}>
                  <Nickname>{data?.user[0].nickname}</Nickname>
                </Link>
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
      <CommentWrite loginState={loginState} postID={id} page={page} />
      <Comments loginState={loginState} page={page} postID={id} />
    </Main>
  );
}
