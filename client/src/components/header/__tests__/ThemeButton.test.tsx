import { render, screen, renderHook } from '@testing-library/react';
import ThemeToggle from '../HeaderThemeButton';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { DarkMode } from '../../../store/atom';
import userEvent from '@testing-library/user-event';

describe('ThemeButton test', () => {
  test('버튼을 클릭 했을 때 DarkMode 상태 값이 Toggle 된다', async () => {
    render(
      <RecoilRoot>
        <ThemeToggle />
      </RecoilRoot>
    );

    const themeButton = screen.getByTestId('theme_button');

    await userEvent.click(themeButton);
    const { result: firstTest } = renderHook(() => useRecoilValue(DarkMode), {
      wrapper: RecoilRoot,
    });
    expect(firstTest.current).toBe(true);

    await userEvent.click(themeButton);
    const { result: secondTest } = renderHook(() => useRecoilValue(DarkMode), {
      wrapper: RecoilRoot,
    });

    expect(secondTest.current).toBe(false);
  });
});
