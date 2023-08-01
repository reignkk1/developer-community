import { useRecoilState } from 'recoil';
import { DarkMode } from '../../store/atom';

import styled from '@emotion/styled';

const ThemeBtn = styled.button`
  width: 130px;
  text-align: center;
  color: ${props => props.theme.textColor};
  background-color: ${props => props.theme.bgThemeBtnColor};
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 8px 15px 8px 5px;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.textColor};
  }
  @media (max-width: 1065px) {
    display: none;
  }
`;

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useRecoilState(DarkMode);

  return (
    <ThemeBtn
      data-testid="theme_button"
      onClick={() => setIsDarkMode(!isDarkMode)}
    >
      {isDarkMode ? '☀️ 라이트모드' : '🌙 다크모드'}
    </ThemeBtn>
  );
}
