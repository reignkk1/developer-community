import { useLocation, useParams } from 'react-router-dom';

// File

import UserInfoContainer from '../components/user/UserInfoContainer';
import { Main } from '../styles/PageShareStyle';
import ActivityList from '../components/activity/ActivityList';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorBox, LoadingBox } from '../components/common/LoadingError';
import useActiveSection from '../hooks/useActiveSection';

// =============================================================================

export default function UserActivity() {
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const section = pathname.split('/')[3];

  const components = [
    <UserInfoContainer userId={id} />,
    <ActivityList section={section} userId={id} />,
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
