import { useParams } from 'react-router-dom';

// File

import UserInfoContainer from '../components/user/UserInfoContainer';
import { Main } from '../styles/PageShareStyle';
import { IActivityPage } from '../types/types';
import ActivityList from '../components/activity/ActivityList';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorBox, LoadingBox } from '../components/common/LoadingError';

// =============================================================================

export default function UserActivity({ page }: IActivityPage) {
  const { id } = useParams();

  const components = [
    <UserInfoContainer userId={id} />,
    <ActivityList page={page} />,
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
