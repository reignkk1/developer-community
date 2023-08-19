import Title from '../../components/category/CategoryTitle';
import CategoryPostList from '../../components/category/CategoryPostList';
import Button from '../../components/common/button';
import { Main } from '../../styles/PageShareStyle';
import { Suspense } from 'react';
import { ErrorBox, LoadingBox } from '../../components/common/LoadingError';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import useLoginUser from '../../hooks/useLoginUser';

// =============================================================================

export default function Notice() {
  const loginUser = useLoginUser();
  const navigate = useNavigate();

  const onClick = () => {
    loginUser ? navigate('write') : navigate('/login');
  };

  return (
    <Main>
      <Title
        name="공지사항"
        explain="Developer의 새소식, 이벤트, 행사 정보를 공유하는 공간입니다."
      />
      {loginUser?.manager ? (
        <Button onClick={onClick}>✏️작성하기</Button>
      ) : null}

      <Suspense fallback={<LoadingBox />}>
        <ErrorBoundary fallback={<ErrorBox />}>
          <CategoryPostList page="notice" />
        </ErrorBoundary>
      </Suspense>
    </Main>
  );
}
