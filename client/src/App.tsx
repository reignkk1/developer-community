import './styles/signatureColor.css';
import styled from '@emotion/styled';
import Header from './components/layout/Header';
import ScrollToTop from './utils/ScrollToTop';
import Footer from './components/layout/Footer';
import GlobalStyle from './styles/GlobalStyle';
import Providers from './components/Providers';
import Page from './components/Page';

const Wrapper = styled.main`
  width: 100%;
  margin-top: 100px;
  height: 100%;
`;

function App() {
  return (
    <Providers>
      <GlobalStyle />
      <ScrollToTop />
      <Wrapper>
        <Header />
        <Page />
        <Footer />
      </Wrapper>
    </Providers>
  );
}

export default App;
