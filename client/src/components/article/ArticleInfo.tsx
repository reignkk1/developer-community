import { Link, useNavigate, useParams } from "react-router-dom";
import Parser from "html-react-parser";
import { useRecoilValue } from "recoil";

// File
import Button from "../common/button";
import { IArticleCommentData, IUserData } from "../../types";
import { ErrorBox, LoadingBox } from "../common/LoadingError";
import Avartar from "../common/Avartar";
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
import { category } from "../../atom";
import { useDeleteAxios, useGetAxios } from "../../hooks/api/http";

// =============================================================================

export default function ArticleInfo() {
  const navigate = useNavigate();
  const currentCategory = useRecoilValue(category);

  // URL 파라미터 ID값
  const { id } = useParams();

  // 로그인 한 유저 정보
  const { data: loginUser } = useGetAxios<IUserData>("/user/login-info");

  // 게시물
  const { data, isLoading, error } = useGetAxios<IArticleCommentData>(
    `/article/${id}`
  );

  const onSuccess = () => navigate(`/${currentCategory}`);

  const { mutate: deletePost } = useDeleteAxios(`/article/${id}`, onSuccess);

  const deleteClick = () => {
    if (window.confirm("정말로 삭제 하시겠습니까?")) {
      deletePost();
    } else {
      return;
    }
  };
  const editClick = () => navigate("edit");

  return (
    <>
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
              {currentCategory === "guest-book"
                ? null
                : Parser(data?.content || "")}
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
    </>
  );
}
