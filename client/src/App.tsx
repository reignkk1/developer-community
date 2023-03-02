import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { css, Global, ThemeProvider, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";

// =============================================================================

// Page
import Header from "./components/Header";
import Home from "./pages/Home";
import Notice from "./pages/Notice";
import Question from "./pages/Question";
import Life from "./pages/Life";
import Quote from "./pages/Quote";
import ArticleInfo from "./components/ArticleInfo";

import Edit from "./components/Edit";
import Write from "./components/Write";

import QuoteEdit from "./components/QuoteEdit";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Account from "./pages/Account";
import PasswordChange from "./pages/PasswordChange";
import WithdrawConfirm from "./pages/WithdrawConfirm";
import UserInfo from "./pages/UserActivity";
import Search from "./pages/Search";

// =============================================================================

import ScrollToTop from "./ScrollToTop";
import { props } from "./interface";
import Footer from "./components/Footer";
import { darkMode, lightMode } from "./theme";

// =============================================================================

const Main = styled.main`
  width: 100%;
  margin-top: 100px;
`;

// =============================================================================

function App() {
  const client = new QueryClient();

  const [isDarkMode, SetDarkMode] = useState(false);

  const toggleTheme = () => {
    SetDarkMode((current) => !current);
  };

  function GlobalStyles() {
    const theme = useTheme();
    const reset = css`
      html,
      body,
      div,
      span,
      applet,
      object,
      iframe,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      blockquote,
      pre,
      a,
      abbr,
      acronym,
      address,
      big,
      cite,
      code,
      del,
      dfn,
      em,
      img,
      ins,
      kbd,
      q,
      s,
      samp,
      small,
      strike,
      strong,
      sub,
      sup,
      tt,
      var,
      b,
      u,
      i,
      center,
      dl,
      dt,
      dd,
      ol,
      ul,
      li,
      fieldset,
      form,
      label,
      legend,
      table,
      caption,
      tbody,
      tfoot,
      thead,
      tr,
      th,
      td,
      article,
      aside,
      canvas,
      details,
      embed,
      figure,
      figcaption,
      footer,
      header,
      hgroup,
      menu,
      nav,
      output,
      ruby,
      section,
      summary,
      time,
      mark,
      audio,
      video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
      }
      /* HTML5 display-role reset for older browsers */
      article,
      aside,
      details,
      figcaption,
      figure,
      footer,
      header,
      hgroup,
      menu,
      nav,
      section {
        display: block;
      }
      body {
        line-height: 1;
      }
      ol,
      ul {
        list-style: none;
      }
      blockquote,
      q {
        quotes: none;
      }
      blockquote:before,
      blockquote:after,
      q:before,
      q:after {
        content: "";
        content: none;
      }
      table {
        border-collapse: collapse;
        border-spacing: 0;
      }
      * {
        box-sizing: border-box;
      }
      a {
        text-decoration: none;
        color: black;
      }

      body {
        background-color: ${theme.bgColor};
        color: ${theme.textColor};
      }
      .articleWrite {
        .ck-editor__editable_inline {
          height: 400px;
          line-height: 1.5;
          margin-bottom: 20px;
        }
      }
      .commentWrite {
        .ck.ck-editor {
          width: 93%;
        }
        .ck-editor__editable_inline {
          height: auto;
          line-height: 1.5;
        }
      }
    `;
    return <Global styles={reset} />;
  }

  return (
    <>
      <ThemeProvider theme={isDarkMode ? darkMode : lightMode}>
        <Main>
          <RecoilRoot>
            <QueryClientProvider client={client}>
              <Router>
                <GlobalStyles />
                <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <ScrollToTop />
                <Routes>
                  {/*==================== global page =================== */}

                  <Route path="/" element={<Home />} />
                  <Route path="/notice" element={<Notice />} />
                  <Route path="/question" element={<Question />} />
                  <Route path="/life" element={<Life />} />
                  <Route path="/quote" element={<Quote />} />
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
                  <Route
                    path="/life/:id"
                    element={<ArticleInfo page="life" />}
                  />
                  <Route
                    path="/quote/:id"
                    element={<ArticleInfo page="quote" />}
                  />
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
                  <Route
                    path="/question/:id/edit"
                    element={<Edit page="question" />}
                  />
                  <Route path="/life/:id/edit" element={<Edit page="life" />} />
                  <Route path="/quote/:id/edit" element={<QuoteEdit />} />
                </Routes>
                <Footer />
              </Router>
              <ReactQueryDevtools />
            </QueryClientProvider>
          </RecoilRoot>
        </Main>
      </ThemeProvider>
    </>
  );
}

export default App;
