import '@testing-library/jest-dom';
import LoginSignUpBtn from '../HeaderLoginButtons';
import userEvent from '@testing-library/user-event';
import { LocationDisplay } from '../../../utils/test/LocationDisplay';
import { renderWithTest } from '../../../utils/test/renderWithTest';

describe('LoginSignUp Buttons test', () => {
  const setup = () => {
    const buttons = [
      { name: '로그인', path: '/login' },
      { name: '회원가입', path: '/signup' },
    ];
    const utils = renderWithTest(
      <>
        <LocationDisplay />
        <LoginSignUpBtn />
      </>
    );

    return { ...utils, buttons };
  };

  test('버튼 클릭하면 페이지 이동', () => {
    const { getByText, getByTestId, buttons } = setup();

    buttons.forEach(button => {
      userEvent.click(getByText(`${button.name}`));
      expect(getByTestId('pathName')).toHaveTextContent(`${button.path}`);
    });
  });
});
