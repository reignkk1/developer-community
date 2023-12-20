import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorBox, LoadingBox } from './common/LoadingError';

interface AsyncSuspenseProps {
  children: React.ReactNode;
}

export default function AsyncSuspense({ children }: AsyncSuspenseProps) {
  return (
    <Suspense fallback={<LoadingBox />}>
      <ErrorBoundary fallback={<ErrorBox />}>{children}</ErrorBoundary>
    </Suspense>
  );
}
