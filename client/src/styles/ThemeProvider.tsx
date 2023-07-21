import { ThemeProvider as ProviderContainer } from '@emotion/react';
import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { DarkMode } from '../store/atom';
import { darkMode, lightMode } from './theme';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const isDarkMode = useRecoilValue(DarkMode);
  return (
    <ProviderContainer theme={isDarkMode ? darkMode : lightMode}>
      {children}
    </ProviderContainer>
  );
}
