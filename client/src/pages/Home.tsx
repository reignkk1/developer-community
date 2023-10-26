import styled from '@emotion/styled';
import HomePostList from '../components/home/HomePostList';
import HomePostTitle from '../components/home/HomePostTitle';
import { Main } from '../styles/PageShareStyle';
import { IPage } from '../types/types';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorBox, LoadingBox } from '../components/common/LoadingError';
import homeSectionData from '../homeData.json';

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
  const { routes } = homeSectionData;

  return (
    <Container>
      {routes.map(({ title, path, getURL }, idx) => (
        <div key={idx}>
          <HomePostTitle to={path}>{title}</HomePostTitle>
          <Suspense fallback={<LoadingBox />}>
            <ErrorBoundary fallback={<ErrorBox />}>
              <HomePostList routeTree={{ getURL, title, path }} />
            </ErrorBoundary>
          </Suspense>
        </div>
      ))}
    </Container>
  );
}
