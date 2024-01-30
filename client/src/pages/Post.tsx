import { useLocation, useParams } from 'react-router-dom';
import Article from '../components/post/Article';
import CommentList from '../components/post/CommentList';
import CommentWrite from '../components/post/CommentWrite';
import { Main } from '../styles/PageShareStyle';
import AsyncSuspense from '../components/AsyncSuspense';

export default function Post() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const section = pathname.split('/')[1];
  return (
    <AsyncSuspense>
      <Main>
        <Article section={section} id={id} />
        <CommentWrite section={section} />
        <CommentList section={section} id={id} />
      </Main>
    </AsyncSuspense>
  );
}
