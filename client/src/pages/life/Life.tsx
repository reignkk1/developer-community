import Button from '../../components/common/button';
import CategoryPostList from '../../components/category/CategoryPostList';
import Title from '../../components/category/CategoryTitle';
import { Main } from '../../styles/PageShareStyle';
import useLoginUser from '../../hooks/useLoginUser';
import { useNavigate } from 'react-router-dom';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorBox, LoadingBox } from '../../components/common/LoadingError';

// =============================================================================

export default function Life() {
  const loginUser = useLoginUser();
  const navigate = useNavigate();

  const onClick = () => {
    loginUser ? navigate('write') : navigate('/login');
  };
  return (
    <Main>
      <Title
        name="사는얘기"
        explain="삶과 애환에 관한 다양한 이야기를 나누는 공간입니다."
      />
      <Button onClick={onClick}>✏️작성하기</Button>
      <Suspense fallback={<LoadingBox />}>
        <ErrorBoundary fallback={<ErrorBox />}>
          <CategoryPostList page="life" />
        </ErrorBoundary>
      </Suspense>
    </Main>
  );
}
