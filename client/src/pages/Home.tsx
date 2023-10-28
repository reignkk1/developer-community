import styled from '@emotion/styled';
import HomePostList from '../components/home/HomePostList';
import HomePostTitle from '../components/home/HomePostTitle';
import { Main } from '../styles/PageShareStyle';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorBox, LoadingBox } from '../components/common/LoadingError';
import homeSectionData from '../homeSection.json';
import Seo from '../Seo';

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
  const { routes, title } = homeSectionData;

  return (
    <Container>
      <Seo title={title} />
      {routes.map(({ header, path, getFetchURL }, idx) => (
        <div key={idx}>
          <HomePostTitle to={path}>{header}</HomePostTitle>
          <Suspense fallback={<LoadingBox />}>
            <ErrorBoundary fallback={<ErrorBox />}>
              <HomePostList routeTree={{ getFetchURL, header, path }} />
            </ErrorBoundary>
          </Suspense>
        </div>
      ))}
    </Container>
  );
}
