import styled from '@emotion/styled';
import HomePostList from '../components/home/HomePostList';
import HomePostTitle from '../components/home/HomePostTitle';
import { Main } from '../styles/PageShareStyle';
import Head from '../components/Head';
import AsyncSuspense from '../components/AsyncSuspense';
import sectionData from '../sectionData.json';

// =============================================================================

export default function Home() {
  const { data } = sectionData;

  return (
    <Container>
      <Head title="홈" />
      {data.map(({ title, path }, idx) => (
        <div key={idx}>
          <HomePostTitle to={path}>{title}</HomePostTitle>
          <AsyncSuspense>
            <HomePostList title={title} path={path} />
          </AsyncSuspense>
        </div>
      ))}
    </Container>
  );
}

const Container = styled(Main)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 50px;
  @media (max-width: 920px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media (max-width: 630px) {
  }
`;
