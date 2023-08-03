import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ThemeToggle from '../HeaderThemeButton';
import { RecoilRoot } from 'recoil';
import { DarkMode } from '../../../store/atom';
import userEvent from '@testing-library/user-event';
import { RecoilObserver } from '../../../utils/RecoilObserver';

describe('ThemeButton test', () => {
  test('버튼을 클릭 했을 때 DarkMode 상태 값이 Toggle 된다', async () => {
    const onClick = jest.fn();

    render(
      <RecoilRoot>
        <RecoilObserver node={DarkMode} onClick={onClick} />
        <ThemeToggle />
      </RecoilRoot>
    );

    const themeButton = screen.getByText(/다크모드/);
    expect(onClick).toHaveBeenCalledWith(false);
    await userEvent.click(themeButton);
    expect(onClick).toHaveBeenLastCalledWith(true);
    expect(themeButton).toHaveTextContent(/라이트모드/);
  });
});
