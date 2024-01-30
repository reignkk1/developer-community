import Button from '../components/common/button';
import { Main } from '../styles/PageShareStyle';
import PostList from '../components/category/PostList';
import Title from '../components/category/CategoryTitle';
import useLoginUser from '../hooks/useLoginUser';
import { useLocation, useNavigate } from 'react-router-dom';
import GuestBookList from '../components/guestBook/GuestBookList';
import GuestBookInput from '../components/guestBook/GuestBookInput';
import Head from '../components/Head';
import { SectionData } from '../types/types';
import AsyncSuspense from '../components/AsyncSuspense';

interface SectionProps {
  sectionData: SectionData[];
}

// =============================================================================

export default function PostSection({ sectionData }: SectionProps) {
  const { pathname } = useLocation();

  const { title, description, path } = sectionData.filter(({ path }) =>
    pathname.startsWith(path)
  )[0];

  let content;

  if (path === '/guest-book') {
    content = <GuestBook />;
  } else {
    content = <PostListSection path={path} />;
  }

  return (
    <Main>
      <Head title={title} />
      <Title name={title} explain={description} />
      <AsyncSuspense>{content}</AsyncSuspense>
    </Main>
  );
}

function GuestBook() {
  return (
    <>
      <GuestBookInput />
      <GuestBookList />
    </>
  );
}

function PostListSection({ path }: { path: string }) {
  const loginUser = useLoginUser();
  const navigate = useNavigate();

  const onClick = () => (loginUser ? navigate('write') : navigate('/login'));

  const isWriteButton =
    (path === '/notice' && loginUser?.manager) ||
    (path !== '/notice' && loginUser);

  return (
    <>
      {isWriteButton && <Button onClick={onClick}>✏️작성하기</Button>}
      <PostList />
    </>
  );
}
