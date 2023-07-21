import styled from '@emotion/styled';
import HomePostList from '../components/home/HomePostList';
import HomePostTitle from '../components/home/HomePostTitle';
import { Main } from '../styles/PageShareStyle';
import { IPage } from '../../types/types';

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

interface ICateogry extends IPage {
  name: string;
}

export default function Home() {
  const category: ICateogry[] = [
    {
      name: '공지사항',
      page: 'notice',
    },
    {
      name: 'Tech',
      page: 'tech',
    },
    {
      name: '사는 얘기',
      page: 'life',
    },
    {
      name: '방명록',
      page: 'guest-book',
    },
  ];

  return (
    <Container>
      {category.map(item => (
        <div key={item.name}>
          <HomePostTitle to={`/${item.page}`}>{item.name}</HomePostTitle>
          <HomePostList page={item.page} />
        </div>
      ))}
    </Container>
  );
}
