import { useQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";

// File
import { IArticleCommentData, IPage } from "../../../types";
import { ErrorBox, LoadingBox } from "../../common/LoadingError";
import PageNumberBar from "../../common/pageNumBar";
import Avartar from "../../common/Avartar";
import { articleAllGet } from "../../../axios";

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

  // 모든 게시물 Fetch
  const { isLoading, error, data } = useQuery<IArticleCommentData[]>(
    `${page}`,
    () => articleAllGet(page)
  );

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
        {data
          ?.slice(
            // 한 페이지당 10개의 게시물을 보여줌
            pageCount === null ? 0 : Number(pageCount) * 10 - 10,
            pageCount === null ? 10 : Number(pageCount) * 10
          )
          .map((post) => (
            <ListItem key={post.id}>
              <NicknameBox>
                <Link to={`/user/${post.writerID}/posts`}>
                  <Avartar width="20px" heigth="20px" src={post.avartar} />
                </Link>
                <Link to={`/user/${post.writerID}/posts`}>
                  <Nickname>{post.nickname}</Nickname>
                </Link>
              </NicknameBox>
              <Link to={`/${page}/${post.id}`}>
                <ListTitle>{post.title}</ListTitle>
              </Link>
              <ListDate>{post.date}</ListDate>
            </ListItem>
          ))}
      </ListBox>

      <PageNumberBar
        dataLength={data?.length}
        page={page}
        pageCount={pageCount}
      />
    </>
  );
}
