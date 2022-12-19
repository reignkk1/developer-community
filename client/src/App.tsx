import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import View from "./pages/View";
import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import reset from "./reset";
import Header from "./components/Header";
import Home from "./pages/Home";
import Notice from "./pages/Notice";
import ArticleInfo from "./pages/ArticleInfo";
import { RecoilRoot } from "recoil";

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
        <RecoilRoot>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/notice/:id" element={<ArticleInfo />} />
            <Route path="/notice/write" element={<View />} />
          </Routes>
        </RecoilRoot>
      </Router>
    </Main>
  );
}

export default App;
