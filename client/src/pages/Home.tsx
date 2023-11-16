import styled from '@emotion/styled';
import HomePostList from '../components/home/HomePostList';
import HomePostTitle from '../components/home/HomePostTitle';
import { Main } from '../styles/PageShareStyle';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorBox, LoadingBox } from '../components/common/LoadingError';
import sectionPost from '../sectionPost.json';
import Head from '../components/Head';

// =============================================================================

const Container = styled(Main)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 50px;
  @media (max-width: 920px) {
    grid-template-columns: repeat(1, 1fr);
    width: 600px;
    margin: 0 auto;
  }
  @media (max-width: 630px) {
    width: 450px;
  }
`;

// =============================================================================

export default function Home() {
  const { routes } = sectionPost;

  return (
    <Container>
      <Head title="홈" />
      {routes.map(({ title, section }, idx) => (
        <div key={idx}>
          <HomePostTitle to={`/${section}`}>{title}</HomePostTitle>
          <Suspense fallback={<LoadingBox />}>
            <ErrorBoundary fallback={<ErrorBox />}>
              <HomePostList routeTree={{ title, section }} />
            </ErrorBoundary>
          </Suspense>
        </div>
      ))}
    </Container>
  );
}
