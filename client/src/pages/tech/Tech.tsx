import Button from '../../components/common/button';
import CategoryPostList from '../../components/category/CategoryPostList';
import Title from '../../components/category/CategoryTitle';
import { Main } from '../../styles/PageShareStyle';
import { useNavigate } from 'react-router-dom';
import useLoginUser from '../../hooks/useLoginUser';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorBox, LoadingBox } from '../../components/common/LoadingError';

// =============================================================================

export default function Tech() {
  const loginUser = useLoginUser();
  const navigate = useNavigate();

  const onClick = () => {
    loginUser ? navigate('write') : navigate('/login');
  };
  return (
    <Main>
      <Title
        name="Tech"
        explain="기술 관련이나 CS지식을 적어주세요 (제 개인 공부용이기도 합니다)"
      />
      <Button onClick={onClick}>✏️질문하기</Button>
      <Suspense fallback={<LoadingBox />}>
        <ErrorBoundary fallback={<ErrorBox />}>
          <CategoryPostList page="tech" />
        </ErrorBoundary>
      </Suspense>
    </Main>
  );
}
