import { ThemeProvider as ProviderContainer, Theme } from "@emotion/react";
import { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { DarkMode } from "./atom";
import { darkMode, lightMode } from "./styles/theme";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const isDarkMode = useRecoilValue(DarkMode);
  return (
    <ProviderContainer theme={isDarkMode ? darkMode : lightMode}>
      {children}
    </ProviderContainer>
  );
}
