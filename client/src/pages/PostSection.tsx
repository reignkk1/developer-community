import { Suspense } from 'react';
import Button from '../components/common/button';
import { Main } from '../styles/PageShareStyle';
import { ErrorBoundary } from 'react-error-boundary';
import PostList from '../components/category/PostList';
import { ErrorBox, LoadingBox } from '../components/common/LoadingError';
import Title from '../components/category/CategoryTitle';
import useLoginUser from '../hooks/useLoginUser';
import { useLocation, useNavigate } from 'react-router-dom';
import GuestBookList from '../components/guestBook/GuestBookList';
import GuestBookInput from '../components/guestBook/GuestBookInput';
import Head from '../components/Head';
import Post from '../components/post/Post';
import PostCommentList from '../components/post/PostCommentList';
import { SectionData } from '../types/types';

interface PostSectionProps {
  sectionData: SectionData[];
}

// =============================================================================

export default function PostSection({ sectionData }: PostSectionProps) {
  const { pathname } = useLocation();
  const loginUser = useLoginUser();
  const navigate = useNavigate();

  const { title, description, path } = sectionData.filter(({ path }) =>
    pathname.startsWith(path)
  )[0];

  const section = path.substring(1);
  const id = pathname.split('/')[2];

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
      <Suspense fallback={<LoadingBox />}>
        <ErrorBoundary fallback={<ErrorBox />}>{content}</ErrorBoundary>
      </Suspense>
    </Main>
  );
}
