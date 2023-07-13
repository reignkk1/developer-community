import PagesTitle from "../../components/category/title/Title";
import PagesArticle from "../../components/category/articles/Articles";
import Button from "../../components/common/button";
import usePage from "../../hooks/usePage";
import { Main } from "../../styles/PageShareStyle";

// =============================================================================

export default function Notice() {
  const { loginUser, onClick } = usePage("notice");

  return (
    <Main>
      <PagesTitle
        name="공지사항"
        explain="Developer의 새소식, 이벤트, 행사 정보를 공유하는 공간입니다."
      />
      {loginUser?.manager ? (
        <Button onClick={onClick}>✏️작성하기</Button>
      ) : null}

      <PagesArticle />
    </Main>
  );
}
