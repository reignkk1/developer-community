import { Link } from "react-router-dom";

// File
import { IArticleCommentData, IPage } from "../../../types";
import Avartar from "../../common/Avartar";
import { ErrorBox, LoadingBox } from "../../common/LoadingError";
import {
  Container,
  ListBox,
  ListDate,
  ListItem,
  ListTitle,
  Nickname,
  NicknameBox,
} from "./styles";
import { useGetAxios } from "../../../hooks/api/http";

// =============================================================================

export default function ArticleBox({ page }: IPage) {
  // 모든 게시물 가져옴
  const {
    data: posts,
    isLoading,
    error,
  } = useGetAxios<IArticleCommentData[]>(`/article/${page}/all`);

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <ErrorBox />
  ) : (
    <Container>
      <ListBox>
        {posts?.slice(0, 4).map((post) => (
          <ListItem key={post.id}>
            <NicknameBox>
              <Link to={`/user/${post.writerID}/posts`}>
                <Avartar
                  width="20px"
                  heigth="20px"
                  src={
                    post.avartar ||
                    "https://graph.facebook.com/555897032021233/picture?width=200&height=200"
                  }
                />
              </Link>
              <Link to={`/user/${post.writerID}/posts`}>
                <Nickname>{post.nickname}</Nickname>
              </Link>
              <ListDate>- {post.date}</ListDate>
            </NicknameBox>
            <ListTitle>
              <Link to={`/${post.page}/${post.id}`}>{post.title}</Link>
            </ListTitle>
          </ListItem>
        ))}
      </ListBox>
    </Container>
  );
}
