import './styles/signatureColor.css';
import styled from '@emotion/styled';
import Providers from './components/Providers';
import Routes from './components/Routes';
import GlobalStyles from './styles/GlobalStyle';

const Wrapper = styled.main`
  width: 100%;
  margin-top: 100px;
  height: 100%;
  padding: 0px 10px;
`;

function App() {
  return (
    <Providers>
      <GlobalStyles />
      <Wrapper>
        <Routes />
      </Wrapper>
    </Providers>
  );
}

export default App;

// 작성하기 눌렀을 때 에러!
// Paginate 에러 페이지 넘길 때
