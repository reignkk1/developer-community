import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import reset from "./reset";
import Header from "./components/Header";
import Home from "./pages/Home";
import Notice from "./pages/Notice";
import ArticleInfo from "./components/ArticleInfo";
import Edit from "./components/Edit";
import NoticeWrite from "./pages/write/NoticeWrite";
import Question from "./pages/Question";
import Life from "./pages/Life";
import Quote from "./pages/Quote";

import LifeWrite from "./pages/write/LifeWrite";
import QuoteWrite from "./pages/write/QuoteWrite";
import QuestionWrite from "./pages/write/QuestionWrite";
import ScrollToTop from "./ScrollToTop";

const Main = styled.main`
  width: 100%;
  height: 200vh;
  margin-top: 100px;
`;

function App() {
  return (
    <Main>
      <Global styles={reset} />
      <Router>
        <Header />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/question" element={<Question />} />
          <Route path="/life" element={<Life />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/notice/write" element={<NoticeWrite />} />
          <Route path="/question/write" element={<QuestionWrite />} />
          <Route path="/life/write" element={<LifeWrite />} />
          <Route path="/quote/write" element={<QuoteWrite />} />
          <Route path="/notice/:id" element={<ArticleInfo page="notice" />} />
          <Route
            path="/question/:id"
            element={<ArticleInfo page="question" />}
          />
          <Route path="/life/:id" element={<ArticleInfo page="life" />} />
          <Route path="/quote/:id" element={<ArticleInfo page="quote" />} />
          <Route path="/notice/:id/edit" element={<Edit page="notice" />} />
          <Route path="/question/:id/edit" element={<Edit page="question" />} />
          <Route path="/life/:id/edit" element={<Edit page="life" />} />
          <Route path="/quote/:id/edit" element={<Edit page="quote" />} />
        </Routes>
      </Router>
    </Main>
  );
}

export default App;
