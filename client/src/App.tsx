import './styles/signatureColor.css';
import styled from '@emotion/styled';
import Providers from './components/Providers';
import Routes from './components/Routes';

const Wrapper = styled.main`
  width: 100%;
  margin-top: 100px;
  height: 100%;
  box-sizing: border-box;
  padding: 0px 10px;
`;

function App() {
  return (
    <Providers>
      <Wrapper>
        <Routes />
      </Wrapper>
    </Providers>
  );
}

export default App;
