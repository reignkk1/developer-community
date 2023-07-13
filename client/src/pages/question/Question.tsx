import Button from "../../components/common/button";
import PagesArticle from "../../components/category/articles/Articles";
import PagesTitle from "../../components/category/title/Title";
import usePage from "../../hooks/usePage";
import { Main } from "../../styles/PageShareStyle";

// =============================================================================

export default function Questions() {
  const { onClick } = usePage("question");
  return (
    <Main>
      <PagesTitle
        name="Q & A"
        explain="좋은 질문과 답변으로 동료의 시간을 아껴주세요."
      />
      <Button onClick={onClick}>✏️질문하기</Button>
      <PagesArticle />
    </Main>
  );
}
