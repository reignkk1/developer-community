import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import View from "./pages/View";
import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import reset from "./reset";
import Header from "./components/Header";
import Home from "./pages/Home";

const Main = styled.main`
  width: 100%;
  height: 500vh;
  margin-top: 100px;
`;

function App() {
  return (
    <Main>
      <Global styles={reset} />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </Main>
  );
}

export default App;
