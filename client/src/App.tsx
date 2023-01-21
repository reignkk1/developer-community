import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

const Main = styled.main`
  width: 100%;
  height: 200vh;
  margin-top: 100px;
`;

function App() {
  const client = new QueryClient();
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
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/account" element={<Account />} />

              {/*==================== write page =================== */}

              <Route
                path="/notice/write"
                element={<Write page={props.page.notice} />}
              />
              <Route
                path="/question/write"
                element={<Write page={props.page.question} />}
              />
              <Route
                path="/life/write"
                element={<Write page={props.page.life} />}
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

              {/*==================== edit page =================== */}

              <Route path="/notice/:id/edit" element={<Edit page="notice" />} />
              <Route
                path="/question/:id/edit"
                element={<Edit page="question" />}
              />
              <Route path="/life/:id/edit" element={<Edit page="life" />} />
              <Route path="/quote/:id/edit" element={<QuoteEdit />} />
            </Routes>
          </Router>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </RecoilRoot>
    </Main>
  );
}

export default App;
