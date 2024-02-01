import { useLocation, useParams } from 'react-router-dom';
import UserInfoContainer from '../components/user/UserInfoContainer';
import { Main } from '../styles/PageShareStyle';
import ActivityList from '../components/activity/ActivityList';
import AsyncSuspense from '../components/AsyncSuspense';

// =============================================================================

export default function UserActivity() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const section = pathname.split('/')[3];

  const components = [
    <UserInfoContainer userId={id} />,
    <ActivityList section={section} userId={id} />,
  ];

  return (
    <Main>
      {components.map(component => (
        <AsyncSuspense>{component}</AsyncSuspense>
      ))}
    </Main>
  );
}
