import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";

// File
import { IArticleCommentData, IPage } from "../../../type";
import Avartar from "../../Avartar";
import { ErrorBox, LoadingBox } from "../../LoadingError";
import { logined } from "../../../atom";
import { articleAllGet } from "../../../axios";
import {
  Container,
  ListBox,
  ListDate,
  ListItem,
  ListTitle,
  Nickname,
  NicknameBox,
} from "./styles";

// =============================================================================

export default function ArticleBox({ page }: IPage) {
  // 로그인 상태 Controller
  const setLoginState = useSetRecoilState(logined);

  // 모든 게시물 가져옴
  const { data, isLoading, error } = useQuery<IArticleCommentData>(
    `${page}`,
    () => articleAllGet(page, setLoginState)
  );
  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <ErrorBox />
  ) : (
    <Container>
      <ListBox>
        {data?.result.slice(0, 4).map((item) => (
          <ListItem key={item.id}>
            <NicknameBox>
              <Link to={`/user/${item.writerID}/posts`}>
                <Avartar
                  width="20px"
                  heigth="20px"
                  src={
                    item.avartar ||
                    "https://graph.facebook.com/555897032021233/picture?width=200&height=200"
                  }
                />
              </Link>
              <Link to={`/user/${item.writerID}/posts`}>
                <Nickname>{item.nickname}</Nickname>
              </Link>
              <ListDate>- {item.date}</ListDate>
            </NicknameBox>
            <ListTitle>
              <Link to={`/${item.page}/${item.id}`}>{item.title}</Link>
            </ListTitle>
          </ListItem>
        ))}
      </ListBox>
    </Container>
  );
}
