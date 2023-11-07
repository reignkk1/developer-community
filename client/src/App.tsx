import './styles/signatureColor.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from '@emotion/styled';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// =============================================================================

// Page
import Header from './components/layout/Header';
import Home from './pages/Home';

import Edit from './pages/Edit';
import Write from './pages/Write';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Account from './pages/Account';
import PasswordChange from './pages/PasswordChange';
import WithdrawConfirm from './pages/WithdrawConfirm';
import UserActivity from './pages/UserActivity';
import Search from './pages/Search';

// =============================================================================

import ScrollToTop from './utils/ScrollToTop';
import Footer from './components/layout/Footer';
import GlobalStyle from './styles/GlobalStyle';
import ThemeProvider from './styles/ThemeProvider';
import { HelmetProvider } from 'react-helmet-async';
import PostSection from './pages/PostSection';
import Post from './pages/Post';

// =============================================================================

const Main = styled.main`
  width: 100%;
  margin-top: 100px;
  height: 100%;
`;

// =============================================================================

function App() {
  const client = new QueryClient();

  return (
    <>
      <RecoilRoot>
        <ThemeProvider>
          <QueryClientProvider client={client}>
            <Router>
              <ScrollToTop />
              <GlobalStyle />
              <HelmetProvider>
                <Main>
                  <Header />
                  <Routes>
                    {/*==================== global page =================== */}

                    <Route path="/" element={<Home />} />
                    <Route path="/notice" element={<PostSection />} />
                    <Route path="/tech" element={<PostSection />} />
                    <Route path="/life" element={<PostSection />} />
                    <Route path="/guest-book" element={<PostSection />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/account" element={<Account />} />
                    <Route
                      path="/account/password-change"
                      element={<PasswordChange />}
                    />
                    <Route
                      path="/account/withdraw-confirm"
                      element={<WithdrawConfirm />}
                    />
                    <Route path="/search" element={<Search />} />

                    {/*==================== write page =================== */}

                    <Route path="/notice/write" element={<Write />} />
                    <Route path="/tech/write" element={<Write />} />
                    <Route path="/life/write" element={<Write />} />

                    {/*==================== detail page =================== */}

                    <Route path="/notice/:id" element={<Post />} />
                    <Route path="/tech/:id" element={<Post />} />
                    <Route path="/life/:id" element={<Post />} />

                    <Route path="/user/:id/posts" element={<UserActivity />} />
                    <Route
                      path="/user/:id/comments"
                      element={<UserActivity />}
                    />

                    {/*==================== edit page =================== */}

                    <Route path="/notice/:id/edit" element={<Edit />} />
                    <Route path="/tech/:id/edit" element={<Edit />} />
                    <Route path="/life/:id/edit" element={<Edit />} />
                  </Routes>
                  <Footer />
                </Main>
              </HelmetProvider>
            </Router>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
