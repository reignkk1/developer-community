import styled from '@emotion/styled';
import HomePostList from '../components/home/HomePostList';
import HomePostTitle from '../components/home/HomePostTitle';
import { Main } from '../styles/PageShareStyle';
import Head from '../components/Head';
import { IPost } from '../types/types';
import { useQuery } from 'react-query';
import { getAllPost } from '../api/http';
import AsyncSuspense from '../components/AsyncSuspense';
import sectionData from '../sectionData.json';

// =============================================================================

export default function Home() {
  const { data } = sectionData;

  return (
    <Container>
      <Head title="홈" />
      {data.map(({ title, path }, idx) => (
        <div key={String(idx)}>
          <HomePostTitle to={path}>{title}</HomePostTitle>
          <AsyncSuspense>
            <HomePostListFetcher title={title} path={path}>
              <HomePostList title={title} path={path} />
            </HomePostListFetcher>
          </AsyncSuspense>
        </div>
      ))}
    </Container>
  );
}

interface HomePostListFetcherProps {
  children: React.ReactElement;
  title: string;
  path: string;
}

function HomePostListFetcher({
  children,
  title,
  path,
}: HomePostListFetcherProps) {
  useQuery<IPost[]>(['HOME', title], getAllPost(path), {
    suspense: true,
  });
  return children;
}

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
