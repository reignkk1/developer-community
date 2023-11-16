import { Route, Routes, useLocation } from 'react-router-dom';
import useActiveSection from '../hooks/useActiveSection';
import sectionPost from '../sectionPost.json';
import {
  Home,
  Login,
  SignUp,
  PostSection,
  Profile,
  Account,
  PasswordChange,
  WithdrawConfirm,
  Search,
  Edit,
  Write,
  UserActivity,
} from '../pages';

export default function Page() {
  const section = useActiveSection();
  const { pathname } = useLocation();

  let element;

  switch (section) {
    case 'home':
      element = <Home />;
      break;
    case 'account':
      element = <Account />;
      break;
    case 'edit':
      element = <Edit />;
      break;
    case 'write':
      element = <Write />;
      break;
    case 'login':
      element = <Login />;
      break;
    case 'password-change':
      element = <PasswordChange />;
      break;
    case 'search':
      element = <Search />;
      break;
    case 'signup':
      element = <SignUp />;
      break;
    case 'user':
      element = <UserActivity />;
      break;
    case 'profile':
      element = <Profile />;
      break;
    case 'withdraw-confirm':
      element = <WithdrawConfirm />;
      break;
  }

  return (
    <Routes>
      {sectionPost.routes.map(({ section }) => (
        <Route path={`/${section}`} element={<PostSection />} />
      ))}
      <Route path={pathname} element={element} />
    </Routes>
  );
}
