import PostDetail from '../../components/post/PostDetail';
import PostCommentList from '../../components/post/PostCommentList';
import { Main } from '../../styles/PageShareStyle';
import { Suspense } from 'react';
import { ErrorBox, LoadingBox } from '../../components/common/LoadingError';
import { ErrorBoundary } from 'react-error-boundary';

export default function TechDetail() {
  const components = [
    <PostDetail page="tech" />,
    <PostCommentList page="tech" />,
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
