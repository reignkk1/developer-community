import "./styles/signatureColor.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "@emotion/styled";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// =============================================================================

// Page
import Header from "./components/header/Header";
import Home from "./pages/Home";
import Notice from "./pages/notice/Notice";
import Tech from "./pages/tech/Tech";
import Life from "./pages/life/Life";
import GuestBook from "./pages/GuestBook/Guestbook";

import Edit from "./components/common/Edit";
import Write from "./components/common/Write";

import QuoteEdit from "./pages/QuoteEdit";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Account from "./pages/Account";
import PasswordChange from "./pages/PasswordChange";
import WithdrawConfirm from "./pages/WithdrawConfirm";
import UserInfo from "./pages/UserActivity";
import Search from "./pages/Search";

// =============================================================================

import ScrollToTop from "./utils/ScrollToTop";
import Footer from "./components/common/Footer";
import GlobalStyle from "./styles/GlobalStyle";
import ThemeProvider from "./ThemeProvider";
import NoticeDetail from "./pages/notice/NoticeDetail";
import QuestionDetail from "./pages/tech/TechDetail";
import LifeDetail from "./pages/life/LifeDetail";
import QuoteDetail from "./pages/GuestBook/GuestBookDetail";

// =============================================================================

const Main = styled.main`
  width: 100%;
  margin-top: 100px;
`;

// =============================================================================

function App() {
  const client = new QueryClient();

  return (
    <>
      <RecoilRoot>
        <ThemeProvider>
          <Main>
            <QueryClientProvider client={client}>
              <Router>
                <GlobalStyle />
                <Header />
                <ScrollToTop />
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
                  <Route path="/guest-book/:id" element={<QuoteDetail />} />
                  <Route
                    path="/user/:id/posts"
                    element={<UserInfo page="posts" />}
                  />
                  <Route
                    path="/user/:id/comments"
                    element={<UserInfo page="comments" />}
                  />

                  {/*==================== edit page =================== */}

                  <Route
                    path="/notice/:id/edit"
                    element={<Edit page="notice" />}
                  />
                  <Route path="/tech/:id/edit" element={<Edit page="tech" />} />
                  <Route path="/life/:id/edit" element={<Edit page="life" />} />
                  <Route path="/guest-book/:id/edit" element={<QuoteEdit />} />
                </Routes>
                <Footer />
              </Router>
              <ReactQueryDevtools />
            </QueryClientProvider>
          </Main>
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
