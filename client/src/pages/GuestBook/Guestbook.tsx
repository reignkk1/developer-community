import { Suspense } from 'react';

// File
import Title from '../../components/category/CategoryTitle';
import GuestBookInput from '../../components/guestBook/GuestBookInput';
import { Main } from '../../styles/PageShareStyle';
import GuestBookList from '../../components/guestBook/GuestBookList';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorBox, LoadingBox } from '../../components/common/LoadingError';

// =============================================================================

export default function GuestBook() {
  return (
    <Main>
      <Title name="방명록" explain="쓰셔도 되고 굳이 안 쓰셔도 됩니다" />
      <GuestBookInput />
      <Suspense fallback={<LoadingBox />}>
        <ErrorBoundary fallback={<ErrorBox />}>
          <GuestBookList />
        </ErrorBoundary>
      </Suspense>
    </Main>
  );
}
