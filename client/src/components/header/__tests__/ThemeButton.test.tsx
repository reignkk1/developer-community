import '@testing-library/jest-dom';
import ThemeToggle from '../HeaderThemeButton';
import { DarkMode } from '../../../store/atom';
import userEvent from '@testing-library/user-event';
import { RecoilObserver } from '../../../utils/test/RecoilObserver';
import { renderWithTest } from '../../../utils/test/renderWithTest';

describe('ThemeButton test', () => {
  const onClick = jest.fn();

  const setup = () => {
    const utils = renderWithTest(
      <>
        <RecoilObserver node={DarkMode} onClick={onClick} />
        <ThemeToggle />
      </>
    );
    return { ...utils };
  };

  test('버튼을 클릭 했을 때 DarkMode 상태 값이 Toggle 된다', () => {
    const { getByText } = setup();

    const themeButton = getByText(/다크모드/);
    expect(onClick).toHaveBeenCalledWith(false);
    userEvent.click(themeButton);
    expect(onClick).toHaveBeenLastCalledWith(true);
    expect(themeButton).toHaveTextContent(/라이트모드/);
  });
});
