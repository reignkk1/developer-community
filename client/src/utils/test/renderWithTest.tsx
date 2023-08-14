import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { render } from '@testing-library/react';

interface ITestWrapper {
  children: ReactNode;
}

function TestWrapper({ children }: ITestWrapper) {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <RecoilRoot>
        <MemoryRouter>{children}</MemoryRouter>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export function renderWithTest(components: JSX.Element) {
  return render(<TestWrapper>{components}</TestWrapper>);
}
