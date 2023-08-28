import '@testing-library/jest-dom';
import { renderWithTest } from '../../../utils/test/renderWithTest';
import userEvent from '@testing-library/user-event';
import UserProfileMenu from '../UserProfileMenu';
import { LocationDisplay } from '../../../utils/test/LocationDisplay';

describe('UserProfileMenu test', () => {
  const setup = () => {
    const utils = renderWithTest(
      <>
        <LocationDisplay />
        <UserProfileMenu />
      </>
    );

    return { ...utils };
  };

  test('프로필 메뉴 클릭 시 주소가 잘 이동된다.', () => {
    const { getByText, getByTestId } = setup();

    userEvent.click(getByText('계정'));
    expect(getByTestId('pathName').innerHTML).toBe('/account');
    userEvent.click(getByText('회원정보'));
    expect(getByTestId('pathName').innerHTML).toBe('/profile');
  });
});
