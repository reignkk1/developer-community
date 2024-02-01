import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import {
  Home,
  PostSection,
  Post,
  Login,
  SignUp,
  Profile,
  Account,
  PasswordChange,
  WithdrawConfirm,
  Search,
  Edit,
  Write,
  UserActivity,
} from '../pages';
import Header from './layout/Header';
import Footer from './layout/Footer';
import GlobalStyles from '../styles/GlobalStyle';
import ScrollToTop from '../utils/ScrollToTop';
import sectionData from '../sectionData.json';

export default function Routes() {
  const { data } = sectionData;
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          {createPostSection()}
          <Route path="/account" element={<Account />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/:id/posts" element={<UserActivity />} />
          <Route path="/user/:id/comments" element={<UserActivity />} />
          <Route path="/:section/edit" element={<Edit />} />
          <Route path="/:section/write" element={<Write />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/account/password-change" element={<PasswordChange />} />
        <Route path="/account/withdraw-Confirm" element={<WithdrawConfirm />} />
      </>
    )
  );

  function createPostSection() {
    const sectionRoutes = data.map(({ path }, idx) => (
      <Route
        key={idx}
        path={path}
        element={<PostSection sectionData={data} />}
      />
    ));
    const sectionDetailRoutes = data.map(({ path }, idx) => (
      <Route key={idx} path={path + '/:id'} element={<Post />} />
    ));
    return [...sectionRoutes, ...sectionDetailRoutes];
  }
  return <RouterProvider router={router} />;
}

function Layout() {
  return (
    <>
      <GlobalStyles />
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
