import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import View from "./pages/View";
import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import reset from "./reset";

const Main = styled.main`
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <Main>
      <Global styles={reset} />
      <Router>
        <Routes>
          <Route path="/" element={<View />} />
        </Routes>
      </Router>
    </Main>
  );
}

export default App;
