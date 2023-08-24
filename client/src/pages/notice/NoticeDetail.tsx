import PostDetail from '../../components/post/PostDetail';
import { Suspense } from 'react';
import { Main } from '../../styles/PageShareStyle';
import PostCommentList from '../../components/post/PostCommentList';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorBox, LoadingBox } from '../../components/common/LoadingError';
import { useParams } from 'react-router-dom';

export default function NoticeDetail() {
  const { id } = useParams();

  const components = [
    <PostDetail page="notice" id={id || ''} />,
    <PostCommentList page="notice" id={id || ''} />,
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
