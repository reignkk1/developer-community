import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Parser from "html-react-parser";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";

// File
import Button from "../common/button";
import CommentWrite from "./commentWrite/CommentWrite";
import Comments from "./comments/Comments";
import { logined } from "../../atom";
import { IArticleInfo, IPage } from "../../types";
import { ErrorBox, LoadingBox } from "../common/LoadingError";
import { articleDetail } from "../../axios";
import Avartar from "../common/Avartar";
import { Main } from "../../styles/PageShareStyle";
import {
  ArticleContainer,
  ArticleText,
  ArticleTitle,
  ButtonBox,
  Date,
  Nickname,
  NicknameBox,
  UserBox,
} from "./styles";

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
    () => articleDetail(page, id, setLoginState),
    { refetchOnWindowFocus: false }
  );

  const deleteClick = () => {
    if (window.confirm("정말로 삭제 하시겠습니까?")) {
      axios.delete(`/article/${page}/${id}`).then(() => navigate(`/${page}`));
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
                <Avartar
                  width="50px"
                  heigth="50px"
                  src={data?.result[0].avartar}
                />
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
