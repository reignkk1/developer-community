import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { isOpendAvartarMenu } from '../../../store/atom';
import AvartarClickMenu from '../HeaderAvartarMenu';
import { RecoilObserver } from '../../../utils/test/RecoilObserver';
import { LocationDisplay } from '../../../utils/test/LocationDisplay';
import { renderWithTest } from '../../../utils/test/renderWithTest';

describe('AvartarMenu test', () => {
  const setup = () => {
    const loginUserID = undefined;
    const avartarMenu = [
      {
        path: '/profile',
        name: '내 프로필',
      },
      {
        path: '/account',
        name: '내 계정',
      },
      {
        path: `/user/${loginUserID}/posts`,
        name: '활동 내역',
      },
    ];

    const openAvartarMenu = () => {
      expect(screen.queryByTestId('avartar_menu')).not.toBeInTheDocument();
      userEvent.click(screen.getByRole('img'));
      expect(screen.queryByTestId('avartar_menu')).toBeInTheDocument();
    };

    const onClick = jest.fn();
    const utils = renderWithTest(
      <>
        <LocationDisplay />
        <RecoilObserver node={isOpendAvartarMenu} onClick={onClick} />
        <AvartarClickMenu />
      </>
    );

    return { ...utils, onClick, avartarMenu, openAvartarMenu };
  };

  test('아바타 프로필 클릭하면 메뉴가 열린다.', () => {
    const { openAvartarMenu, queryByText, avartarMenu } = setup();

    openAvartarMenu();
    avartarMenu.forEach(menu =>
      expect(queryByText(menu.name)).toBeInTheDocument()
    );
  });

  test('바깥을 클릭하면 메뉴가 닫힌다', () => {
    const { openAvartarMenu, queryByTestId } = setup();

    openAvartarMenu();
    userEvent.click(document.body);
    expect(queryByTestId('avartar_menu')).not.toBeInTheDocument();
  });

  test('메뉴 클릭 시 해당 주소로 이동한다', () => {
    const {
      getByRole,
      avartarMenu,
      getByText,
      queryByTestId,
      openAvartarMenu,
    } = setup();

    openAvartarMenu();
    avartarMenu.forEach(menu => {
      userEvent.click(getByText(menu.name));
      expect(queryByTestId('pathName')).toHaveTextContent(menu.path);
      userEvent.click(getByRole('img'));
    });
  });
});
