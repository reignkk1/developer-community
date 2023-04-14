import { ReactNode } from "react";
import { ThemeBtn } from "./styles";

interface IThemeToggle {
  children: ReactNode;
  toggleTheme(): void;
}

export default function ThemeToggle({ children, toggleTheme }: IThemeToggle) {
  return <ThemeBtn onClick={toggleTheme}>{children}</ThemeBtn>;
}
