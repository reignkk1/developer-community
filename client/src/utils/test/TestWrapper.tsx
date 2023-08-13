import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { IPage } from '../../types/types';

interface ITestWrapper {
  children: ReactNode;
}

export default function TestWrapper({ children }: ITestWrapper) {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <RecoilRoot>
        <MemoryRouter>{children}</MemoryRouter>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
