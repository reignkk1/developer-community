import { useParams } from 'react-router-dom';
import PostDetail from '../components/post/PostDetail';
import PostCommentList from '../components/post/PostCommentList';
import { Suspense } from 'react';
import { ErrorBox, LoadingBox } from '../components/common/LoadingError';
import { ErrorBoundary } from 'react-error-boundary';
import { Main } from '../styles/PageShareStyle';
import useCurrentSection from '../hooks/useCurrentSection';

export default function Post() {
  const { id } = useParams();
  const currentSection = useCurrentSection();

  const components = [
    <PostDetail section={currentSection} id={id || ''} />,
    <PostCommentList page={currentSection} id={id || ''} />,
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
