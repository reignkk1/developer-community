import PostDetail from '../../components/post/PostDetail';
import PostCommentList from '../../components/post/PostCommentList';
import { Main } from '../../styles/PageShareStyle';
import { Suspense } from 'react';
import { ErrorBox, LoadingBox } from '../../components/common/LoadingError';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';

export default function TechDetail() {
  const { id } = useParams();
  const components = [
    <PostDetail page="tech" id={id || ''} />,
    <PostCommentList page="tech" id={id || ''} />,
  ];

  return (
    <Main>
      {components.map((component, index) => (
        <Suspense key={index} fallback={<LoadingBox />}>
          <ErrorBoundary fallback={<ErrorBox />}>{component}</ErrorBoundary>
        </Suspense>
      ))}
    </Main>
  );
}
