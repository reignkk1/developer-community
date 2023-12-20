import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import {
  Home,
  Section,
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
  const sectionRoutes = data.map(({ path }, idx) => (
    <Route key={idx} path={path} element={<Section sectionData={data} />} />
  ));
  const sectionDetailRoutes = data.map(({ path }, idx) => (
    <Route
      key={idx}
      path={path + '/:id'}
      element={<Section sectionData={data} />}
    />
  ));

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          {sectionRoutes}
          {sectionDetailRoutes}
          <Route path="/account" element={<Account />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<UserActivity />} />
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
