import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider as ProviderContainer } from '@emotion/react';
import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import { HelmetProvider } from 'react-helmet-async';
import { useRecoilValue } from 'recoil';
import { DarkMode } from '../store/atom';
import { darkMode, lightMode } from '../styles/theme';
import { ReactQueryDevtools } from 'react-query/devtools';

export default function Providers({ children }: { children: React.ReactNode }) {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <RecoilRoot>
        <ThemeProvider>
          <HelmetProvider>{children}</HelmetProvider>
        </ThemeProvider>
      </RecoilRoot>
      <ReactQueryDevtools />
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
