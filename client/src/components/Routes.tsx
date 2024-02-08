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
  NotFound,
} from '../pages';
import Header from './layout/Header';
import Footer from './layout/Footer';
import ScrollToTop from '../utils/ScrollToTop';
import sectionData from '../sectionData.json';

export default function Routes() {
  const { data } = sectionData;
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/:section/:id/edit" element={<Edit />} />
          <Route path="/:section/write" element={<Write />} />
          {createPostSectionRoutes()}
          <Route path="/account" element={<Account />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/:id/posts" element={<UserActivity />} />
          <Route path="/user/:id/comments" element={<UserActivity />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/account/password-change" element={<PasswordChange />} />
        <Route path="/account/withdraw-Confirm" element={<WithdrawConfirm />} />
        <Route path="*" element={<NotFound />} />
      </>
    )
  );

  function createPostSectionRoutes() {
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
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
