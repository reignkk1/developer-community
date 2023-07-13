import { useSetRecoilState } from "recoil";
import ArticleInfo from "../../components/article/ArticleInfo";
import { category } from "../../atom";
import { useEffect } from "react";
import { Main } from "../../styles/PageShareStyle";
import CommentWrite from "../../components/article/commentWrite/CommentWrite";
import Comments from "../../components/article/comments/Comments";

export default function QuoteDetail() {
  const setPage = useSetRecoilState(category);

  useEffect(() => {
    setPage("quote");
  }, [setPage]);

  return (
    <Main>
      <ArticleInfo />
      <CommentWrite />
      <Comments />
    </Main>
  );
}
