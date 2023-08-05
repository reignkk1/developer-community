import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

export default function TestWrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <RecoilRoot>
        <MemoryRouter>{children}</MemoryRouter>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
