import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ThemeToggle from '../HeaderThemeButton';
import { DarkMode } from '../../../store/atom';
import userEvent from '@testing-library/user-event';
import { RecoilObserver } from '../../../utils/test/RecoilObserver';
import TestWrapper from '../../../utils/test/TestWrapper';

describe('ThemeButton test', () => {
  test('버튼을 클릭 했을 때 DarkMode 상태 값이 Toggle 된다', () => {
    const onClick = jest.fn();

    render(
      <TestWrapper>
        <RecoilObserver node={DarkMode} onClick={onClick} />
        <ThemeToggle />
      </TestWrapper>
    );

    const themeButton = screen.getByText(/다크모드/);
    expect(onClick).toHaveBeenCalledWith(false);
    userEvent.click(themeButton);
    expect(onClick).toHaveBeenLastCalledWith(true);
    expect(themeButton).toHaveTextContent(/라이트모드/);
  });
});
