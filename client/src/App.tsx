import './styles/signatureColor.css';
import styled from '@emotion/styled';
import Providers from './components/Providers';
import Routes from './components/Routes';
import React from 'react';

const Wrapper = styled.main`
  width: 100%;
  margin-top: 100px;
  height: 100%;
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
