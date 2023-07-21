import { useEffect } from 'react';

// File
import Title from '../../components/category/CategoryTitle';
import GuestBookInput from '../../components/guestBook/GuestBookInput';
import { Main } from '../../styles/PageShareStyle';
import { useSetRecoilState } from 'recoil';
import { category } from '../../store/atom';
import GuestBookList from '../../components/guestBook/GuestBookList';

// =============================================================================

export default function GuestBooks() {
  const setPage = useSetRecoilState(category);

  useEffect(() => {
    setPage('guest-book');
  }, [setPage]);

  return (
    <Main>
      <Title name="방명록" explain="쓰셔도 되고 굳이 안 쓰셔도 됩니다" />
      <GuestBookInput />
      <GuestBookList />
    </Main>
  );
}
