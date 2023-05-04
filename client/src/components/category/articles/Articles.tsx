import { useQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";

// File
import { IArticleCommentData, IPage } from "../../../type";
import { ErrorBox, LoadingBox } from "../../common/LoadingError";
import PageNumberBar from "../../common/pageNumBar";
import Avartar from "../../common/Avartar";
import { articleAllGet } from "../../../axios";
import { logined } from "../../../atom";
import {
  ListBox,
  ListDate,
  ListItem,
  ListTitle,
  Nickname,
  NicknameBox,
} from "./styles";

// =============================================================================

export default function PagesArticle({ page }: IPage) {
  // 로그인 상태 Controller
  const setLoginState = useSetRecoilState(logined);

  // 모든 게시물 Fetch
  const { isLoading, error, data } = useQuery<IArticleCommentData>(
    `${page}`,
    () => articleAllGet(page, setLoginState)
  );
  console.log(data);
  // URL 쿼리에 담긴 Page 데이터 가져옴
  const [query] = useSearchParams();
  const pageCount = query.get("page");

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <ErrorBox />
  ) : (
    <>
      <ListBox>
        {data?.result
          .slice(
            // 한 페이지당 10개의 게시물을 보여줌
            pageCount === null ? 0 : Number(pageCount) * 10 - 10,
            pageCount === null ? 10 : Number(pageCount) * 10
          )
          .map((item) => (
            <ListItem key={item.id}>
              <NicknameBox>
                <Link to={`/user/${item.writerID}/posts`}>
                  <Avartar width="20px" heigth="20px" src={item.avartar} />
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

      <PageNumberBar
        dataLength={data?.result.length}
        page={page}
        pageCount={pageCount}
      />
    </>
  );
}
