import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocationDisplay } from '../../../utils/test/LocationDisplay';
import TestWrapper from '../../../utils/test/TestWrapper';
import Menu from '../HeaderMenu';

describe('Menu test', () => {
  const setup = () => {
    const menuData = [
      { name: '공지사항', path: '/notice' },
      { name: '사는얘기', path: '/life' },
      { name: 'Tech', path: '/tech' },
      { name: '방명록', path: '/guest-book' },
    ];
    const utils = render(
      <TestWrapper>
        <LocationDisplay />
        <Menu menu={menuData} />
      </TestWrapper>
    );

    return { ...utils, menuData };
  };

  test('메뉴 클릭하면 페이지 이동', () => {
    const { menuData, getByText, getByTestId } = setup();
    menuData.forEach(menu => {
      userEvent.click(getByText(`${menu.name}`));
      expect(getByTestId('pathName')).toHaveTextContent(`${menu.path}`);
    });
  });
});
