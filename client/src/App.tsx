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
import Notice from './pages/notice/Notice';
import Tech from './pages/tech/Tech';
import Life from './pages/life/Life';
import GuestBook from './pages/guestbook/Guestbook';

import Edit from './components/common/Edit';
import Write from './components/common/Write';
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
import NoticeDetail from './pages/notice/NoticeDetail';
import QuestionDetail from './pages/tech/TechDetail';
import LifeDetail from './pages/life/LifeDetail';

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
              <Main>
                <Header />
                <Routes>
                  {/*==================== global page =================== */}

                  <Route path="/" element={<Home />} />
                  <Route path="/notice" element={<Notice />} />
                  <Route path="/tech" element={<Tech />} />
                  <Route path="/life" element={<Life />} />
                  <Route path="/guest-book" element={<GuestBook />} />
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

                  <Route
                    path="/notice/write"
                    element={<Write page="notice" />}
                  />
                  <Route path="/tech/write" element={<Write page="tech" />} />
                  <Route path="/life/write" element={<Write page="life" />} />

                  {/*==================== detail page =================== */}

                  <Route path="/notice/:id" element={<NoticeDetail />} />
                  <Route path="/tech/:id" element={<QuestionDetail />} />
                  <Route path="/life/:id" element={<LifeDetail />} />

                  <Route
                    path="/user/:id/posts"
                    element={<UserActivity page="posts" />}
                  />
                  <Route
                    path="/user/:id/comments"
                    element={<UserActivity page="comments" />}
                  />

                  {/*==================== edit page =================== */}

                  <Route
                    path="/notice/:id/edit"
                    element={<Edit page="notice" />}
                  />
                  <Route path="/tech/:id/edit" element={<Edit page="tech" />} />
                  <Route path="/life/:id/edit" element={<Edit page="life" />} />
                </Routes>
                <Footer />
              </Main>
            </Router>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
