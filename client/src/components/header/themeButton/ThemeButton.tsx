import { ReactNode } from "react";
import { Styles } from "./styles";

interface IThemeToggle {
  children: ReactNode;
  toggleTheme(): void;
}

export default function ThemeToggle({ children, toggleTheme }: IThemeToggle) {
  return <Styles.ThemeBtn onClick={toggleTheme}>{children}</Styles.ThemeBtn>;
}
