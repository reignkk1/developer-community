import PostDetail from '../../components/post/PostDetail';
import { Suspense } from 'react';
import { Main } from '../../styles/PageShareStyle';
import PostCommentList from '../../components/post/PostCommentList';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorBox, LoadingBox } from '../../components/common/LoadingError';

export default function NoticeDetail() {
  const components = [
    <PostDetail page="notice" />,
    <PostCommentList page="notice" />,
  ];

  return (
    <Main>
      {components.map(component => (
        <Suspense fallback={<LoadingBox />}>
          <ErrorBoundary fallback={<ErrorBox />}>{component}</ErrorBoundary>
        </Suspense>
      ))}
    </Main>
  );
}
