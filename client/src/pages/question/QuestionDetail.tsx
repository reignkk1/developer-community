import { useSetRecoilState } from "recoil";
import ArticleInfo from "../../components/article/ArticleInfo";
import { category } from "../../atom";
import { useEffect } from "react";
import CommentWrite from "../../components/article/commentWrite/CommentWrite";
import Comments from "../../components/article/comments/Comments";
import { Main } from "../../styles/PageShareStyle";

export default function QuestionDetail() {
  const setPage = useSetRecoilState(category);

  useEffect(() => {
    setPage("question");
  }, [setPage]);

  return (
    <Main>
      <ArticleInfo />
      <CommentWrite />
      <Comments />
    </Main>
  );
}
