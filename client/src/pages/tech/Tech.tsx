import Button from '../../components/common/button';
import PagesArticle from '../../components/categoryPosts/PostList';
import Title from '../../components/categoryPosts/Title';
import usePage from '../../hooks/usePage';
import { Main } from '../../styles/PageShareStyle';

// =============================================================================

export default function Techs() {
  const { onClick } = usePage('tech');
  return (
    <Main>
      <Title
        name="Tech"
        explain="기술 관련이나 CS지식을 적어주세요 (제 개인 공부용이기도 합니다)"
      />
      <Button onClick={onClick}>✏️질문하기</Button>
      <PagesArticle />
    </Main>
  );
}
