import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider as ProviderContainer } from '@emotion/react';
import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { DarkMode } from '../store/atom';
import { darkMode, lightMode } from '../styles/theme';

export default function Providers({ children }: { children: React.ReactNode }) {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <RecoilRoot>
        <ThemeProvider>
          <HelmetProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </HelmetProvider>
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

function ThemeProvider({ children }: { children: ReactNode }) {
  const isDarkMode = useRecoilValue(DarkMode);
  return (
    <ProviderContainer theme={isDarkMode ? darkMode : lightMode}>
      {children}
    </ProviderContainer>
  );
}
