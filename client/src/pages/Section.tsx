import Button from '../components/common/button';
import { Main } from '../styles/PageShareStyle';
import PostList from '../components/category/PostList';
import Title from '../components/category/CategoryTitle';
import useLoginUser from '../hooks/useLoginUser';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import GuestBookList from '../components/guestBook/GuestBookList';
import GuestBookInput from '../components/guestBook/GuestBookInput';
import Head from '../components/Head';
import Post from '../components/post/Post';
import PostCommentList from '../components/post/PostCommentList';
import { SectionData } from '../types/types';
import AsyncSuspense from '../components/AsyncSuspense';

interface SectionProps {
  sectionData: SectionData[];
}

// =============================================================================

export default function Section({ sectionData }: SectionProps) {
  const { pathname } = useLocation();
  const loginUser = useLoginUser();
  const navigate = useNavigate();
  const { id } = useParams();

  const { title, description, path } = sectionData.filter(({ path }) =>
    pathname.startsWith(path)
  )[0];

  const section = path.substring(1);

  const onClick = () => (loginUser ? navigate('write') : navigate('/login'));

  const isWriteButton =
    (path === '/notice' && loginUser?.manager) ||
    (path !== '/notice' && loginUser);

  let content;

  if (id) {
    content = (
      <>
        <Post section={section} id={id} />
        <PostCommentList section={section} id={id} />
      </>
    );
  } else if (path === '/guest-book') {
    content = (
      <>
        <Title name={title} explain={description} />
        <GuestBookInput />
        <GuestBookList />
      </>
    );
  } else {
    content = (
      <>
        <Title name={title} explain={description} />
        <Head title={title} />
        {isWriteButton && <Button onClick={onClick}>✏️작성하기</Button>}
        <PostList routeTree={{ title, section }} />
      </>
    );
  }

  return (
    <Main>
      <AsyncSuspense>{content}</AsyncSuspense>
    </Main>
  );
}
