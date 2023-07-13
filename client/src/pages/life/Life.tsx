import Button from "../../components/common/button";
import PagesArticle from "../../components/category/articles/Articles";
import PagesTitle from "../../components/category/title/Title";
import usePage from "../../hooks/usePage";
import { Main } from "../../styles/PageShareStyle";

// =============================================================================

export default function Life() {
  const { onClick } = usePage("life");
  return (
    <Main>
      <PagesTitle
        name="사는얘기"
        explain="삶과 애환에 관한 다양한 이야기를 나누는 공간입니다."
      />
      <Button onClick={onClick}>✏️작성하기</Button>
      <PagesArticle />
    </Main>
  );
}
