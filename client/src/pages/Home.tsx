import styled from '@emotion/styled';
import HomePostList from '../components/home/HomePostList';
import HomePostTitle from '../components/home/HomePostTitle';
import { Main } from '../styles/PageShareStyle';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorBox, LoadingBox } from '../components/common/LoadingError';
import Head from '../components/Head';
import { SectionData } from '../types/types';

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
interface HomeProps {
  sectionData: SectionData[];
}

// =============================================================================

export default function Home({ sectionData }: HomeProps) {
  return (
    <Container>
      <Head title="홈" />
      {sectionData.map(({ title, path }, idx) => (
        <div key={idx}>
          <HomePostTitle to={path}>{title}</HomePostTitle>
          <Suspense fallback={<LoadingBox />}>
            <ErrorBoundary fallback={<ErrorBox />}>
              <HomePostList sectionData={{ title, path }} />
            </ErrorBoundary>
          </Suspense>
        </div>
      ))}
    </Container>
  );
}
