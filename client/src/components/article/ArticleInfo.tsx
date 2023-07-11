import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Parser from "html-react-parser";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";

// File
import Button from "../common/button";
import CommentWrite from "./commentWrite/CommentWrite";
import Comments from "./comments/Comments";
import { IArticleCommentData, IPage } from "../../types";
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
import { loginUserInfoGet } from "../../atom";

// =============================================================================

export default function ArticleInfo({ page }: IPage) {
  const navigate = useNavigate();
  const loginUser = useRecoilValue(loginUserInfoGet);

  // URL 파라미터 ID값
  const { id } = useParams();

  // 파라미터 ID값 게시물 가져오기
  const { isLoading, error, data } = useQuery<IArticleCommentData>(
    `[Detail${id}]`,
    () => articleDetail(id),
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
              <Link to={`/user/${data?.writerID}/posts`}>
                <Avartar width="50px" heigth="50px" src={data?.avartar} />
              </Link>
              <NicknameBox>
                <Link to={`/user/${data?.writerID}/posts`}>
                  <Nickname>{data?.nickname}</Nickname>
                </Link>
                <Date>{data?.date}</Date>
              </NicknameBox>
            </UserBox>
            <ArticleTitle>{data?.title}</ArticleTitle>
            <ArticleText>
              {page === "quote" ? null : Parser(data?.content || "")}
            </ArticleText>
          </>
        )}
      </ArticleContainer>

      {loginUser?.id === data?.writerID ? (
        <ButtonBox>
          <Button onClick={deleteClick}>삭제</Button>
          <Button onClick={editClick}>수정</Button>
        </ButtonBox>
      ) : null}
      <CommentWrite postID={id} page={page} />
      <Comments page={page} postID={id} />
    </Main>
  );
}
