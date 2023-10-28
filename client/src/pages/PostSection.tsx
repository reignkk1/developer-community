import { Suspense } from 'react';
import Button from '../components/common/button';
import { Main } from '../styles/PageShareStyle';
import { ErrorBoundary } from 'react-error-boundary';
import CategoryPostList from '../components/category/CategoryPostList';
import { ErrorBox, LoadingBox } from '../components/common/LoadingError';
import Title from '../components/category/CategoryTitle';
import useLoginUser from '../hooks/useLoginUser';
import { useNavigate } from 'react-router-dom';
import postSection from '../sectionPost.json';
import useActiveSection from '../hooks/useCurrentSection';
import GuestBookList from '../components/guestBook/GuestBookList';
import GuestBookInput from '../components/guestBook/GuestBookInput';
import Head from '../Head';

// =============================================================================

export default function PostSection() {
  const loginUser = useLoginUser();
  const navigate = useNavigate();

  const currentSection = useActiveSection();
  const { routes } = postSection;
  const {
    header: { title, description },
    getFetchURL,
    section,
  } = routes.filter(route => route.section === currentSection)[0];

  const onClick = () => (loginUser ? navigate('write') : navigate('/login'));

  let writeButton: JSX.Element | null = (
    <Button onClick={onClick}>✏️작성하기</Button>
  );

  let postList = (
    <CategoryPostList routeTree={{ getFetchURL, title, section }} />
  );

  if ((currentSection === 'notice' && !loginUser?.manager) || !loginUser) {
    writeButton = null;
  }

  if (currentSection === 'guest-book') {
    postList = (
      <>
        <GuestBookInput />
        <GuestBookList />
      </>
    );
  }

  return (
    <Main>
      <Head title={title} />
      <Title name={title} explain={description} />
      {writeButton}
      <Suspense fallback={<LoadingBox />}>
        <ErrorBoundary fallback={<ErrorBox />}>{postList}</ErrorBoundary>
      </Suspense>
    </Main>
  );
}
