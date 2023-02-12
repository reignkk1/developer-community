import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import reset from "./reset";
import Header from "./components/Header";
import Home from "./pages/Home";
import Notice from "./pages/Notice";
import ArticleInfo from "./components/ArticleInfo";
import Edit from "./components/Edit";

import Question from "./pages/Question";
import Life from "./pages/Life";
import Quote from "./pages/Quote";

import ScrollToTop from "./ScrollToTop";
import Write from "./components/Write";
import { props } from "./interface";
import QuoteEdit from "./components/QuoteEdit";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import Profile from "./pages/Profile";
import Account from "./pages/Account";

import { ReactQueryDevtools } from "react-query/devtools";
import PasswordChange from "./pages/PasswordChange";
import WithdrawConfirm from "./pages/WithdrawConfirm";
import UserInfo from "./pages/UserInfo";

const Main = styled.main`
  width: 100%;
  height: 200vh;
  margin-top: 100px;
`;

function App() {
  const client = new QueryClient();

  const loginState = sessionStorage.getItem("logined");
  console.log(loginState);

  return (
    <Main>
      <Global styles={reset} />
      <RecoilRoot>
        <QueryClientProvider client={client}>
          <Router>
            <Header />
            <ScrollToTop />
            <Routes>
              {/*==================== global page =================== */}

              <Route path="/" element={<Home />} />
              <Route path="/notice" element={<Notice />} />
              <Route path="/question" element={<Question />} />
              <Route path="/life" element={<Life />} />
              <Route path="/quote" element={<Quote />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/signup"
                element={
                  loginState === `{"logined":true}` ? (
                    <Navigate to="/" />
                  ) : (
                    <SignUp />
                  )
                }
              />
              <Route
                path="/profile"
                element={
                  loginState === `{"logined":true}` ? (
                    <Profile />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/account"
                element={
                  loginState === `{"logined":true}` ? (
                    <Account />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/account/password-change"
                element={
                  loginState === `{"logined":true}` ? (
                    <PasswordChange />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/account/withdraw-confirm"
                element={
                  loginState === `{"logined":true}` ? (
                    <WithdrawConfirm />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />

              {/*==================== write page =================== */}

              <Route
                path="/notice/write"
                element={
                  loginState === `{"logined":true}` ? (
                    <Write page={props.page.notice} />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/question/write"
                element={
                  loginState === `{"logined":true}` ? (
                    <Write page={props.page.question} />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/life/write"
                element={
                  loginState === `{"logined":true}` ? (
                    <Write page={props.page.life} />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />

              {/*==================== detail page =================== */}

              <Route
                path="/notice/:id"
                element={<ArticleInfo page="notice" />}
              />
              <Route
                path="/question/:id"
                element={<ArticleInfo page="question" />}
              />
              <Route path="/life/:id" element={<ArticleInfo page="life" />} />
              <Route path="/quote/:id" element={<ArticleInfo page="quote" />} />
              <Route
                path="/user/:id/article"
                element={<UserInfo page="article" />}
              />
              <Route
                path="/user/:id/comment"
                element={<UserInfo page="comment" />}
              />

              {/*==================== edit page =================== */}

              <Route
                path="/notice/:id/edit"
                element={
                  loginState === `{"logined":true}` ? (
                    <Edit page="notice" />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/question/:id/edit"
                element={
                  loginState === `{"logined":true}` ? (
                    <Edit page="question" />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/life/:id/edit"
                element={
                  loginState === `{"logined":true}` ? (
                    <Edit page="life" />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/quote/:id/edit"
                element={
                  loginState === `{"logined":true}` ? (
                    <QuoteEdit />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
            </Routes>
          </Router>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </RecoilRoot>
    </Main>
  );
}

export default App;
