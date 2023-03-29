import styled from "@emotion/styled";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Parser from "html-react-parser";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";

// File
import Button from "../button/button";
import CommentWrite from "./CommentWrite";
import Comments from "./Comments";
import { logined } from "../../atom";
import { IArticleInfo, IPage } from "../../type";
import { ErrorBox, LoadingBox } from "../LoadingError";
import { articleDetail } from "../../axios";
import Avartar from "../Avartar";
import { Main } from "../../styles/PageShareStyle";

// =============================================================================

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
  const navigate = useNavigate();

  // 로그인 상태값과 Controller
  const [loginState, setLoginState] = useRecoilState(logined);

  // URL 파라미터 ID값
  const { id } = useParams();

  // 파라미터 ID값 게시물 가져오기
  const { isLoading, error, data } = useQuery<IArticleInfo>(
    `Detail${page}`,
    () => articleDetail(page, id, setLoginState)
  );

  const deleteClick = () => {
    if (window.confirm("정말로 삭제 하시겠습니까?")) {
      axios.delete(`/article/${page}/${id}`).then(() => {
        return navigate(`/${page}`);
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
              <Link to={`/user/${data?.result[0].writerID}/posts`}>
                <Avartar width="50px" heigth="50px" />
              </Link>
              <NicknameBox>
                <Link to={`/user/${data?.result[0].writerID}/posts`}>
                  <Nickname>{data?.result[0].nickname}</Nickname>
                </Link>
                <Date>{data?.result[0].date}</Date>
              </NicknameBox>
            </UserBox>
            <ArticleTitle>{data?.result[0].title}</ArticleTitle>
            <ArticleText>
              {page === "quote" ? null : Parser(data?.result[0].content || "")}
            </ArticleText>
          </>
        )}
      </ArticleContainer>

      {loginState && data?.writerMatch ? (
        <ButtonBox>
          <Button onClick={deleteClick}>삭제</Button>
          <Button onClick={editClick}>수정</Button>
        </ButtonBox>
      ) : null}
      <CommentWrite loginState={loginState} postID={id} page={page} />
      <Comments loginState={loginState} page={page} postID={id} />
    </Main>
  );
}
