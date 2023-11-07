import { useParams } from 'react-router-dom';

// File

import UserInfoContainer from '../components/user/UserInfoContainer';
import { Main } from '../styles/PageShareStyle';
import ActivityList from '../components/activity/ActivityList';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorBox, LoadingBox } from '../components/common/LoadingError';
import useCurrentSection from '../hooks/useCurrentSection';

// =============================================================================

export default function UserActivity() {
  const { id } = useParams();
  const currentSection = useCurrentSection();

  const components = [
    <UserInfoContainer userId={id} />,
    <ActivityList section={currentSection} userId={id} />,
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
