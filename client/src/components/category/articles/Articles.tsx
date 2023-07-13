import { Link, useSearchParams } from "react-router-dom";

// File
import { IArticleCommentData } from "../../../types";
import { ErrorBox, LoadingBox } from "../../common/LoadingError";
import PageNumberBar from "../../common/pageNumBar";
import Avartar from "../../common/Avartar";

import {
  ListBox,
  ListDate,
  ListItem,
  ListTitle,
  Nickname,
  NicknameBox,
} from "./styles";
import { useGetAxios } from "../../../hooks/api/Article";
import { useRecoilValue } from "recoil";
import { category } from "../../../atom";

// =============================================================================

export default function PagesArticle() {
  const page = useRecoilValue(category);
  // 모든 게시물 가져오기
  const { data, isLoading, error } = useGetAxios<IArticleCommentData[]>(
    `/article/${page}/all`
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

      <PageNumberBar dataLength={data?.length} pageCount={pageCount} />
    </>
  );
}
