import { ThemeBtn } from "./styles";
import { useRecoilState } from "recoil";
import { DarkMode } from "../../../atom";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useRecoilState(DarkMode);

  return (
    <ThemeBtn onClick={() => setIsDarkMode(!isDarkMode)}>
      {isDarkMode ? "☀️ 라이트모드" : "🌙 다크모드"}
    </ThemeBtn>
  );
}
