import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import DrawerMenu from '../HeaderDrawerMenu';
import HambugerButton from '../HeaderHambugerButton';
import userEvent from '@testing-library/user-event';
import { renderWithTest } from '../../../utils/test/renderWithTest';

describe('DrawerMenu test', () => {
  const setup = () => {
    const clickOpenButton = () => {
      expect(screen.getByTestId('drawer_menu')).toHaveStyle('display:none');
      userEvent.click(screen.getByRole('button'));
      expect(screen.getByTestId('drawer_menu')).toHaveStyle('display:block');
    };
    const closeDrawerMenu = () => {
      expect(screen.getByTestId('drawer_menu')).toHaveStyle('display:none');
    };

    const utils = renderWithTest(
      <>
        <HambugerButton style={{ display: 'block' }} />
        <DrawerMenu />
      </>
    );
    return { ...utils, clickOpenButton, closeDrawerMenu };
  };

  test('햄버거 버튼 클릭하면 열린다', () => {
    const { clickOpenButton } = setup();

    clickOpenButton();
  });

  test('바깥을 클릭하면 닫힌다', () => {
    const { getByTestId, clickOpenButton, closeDrawerMenu } = setup();

    clickOpenButton();
    userEvent.click(getByTestId('drawerMenu_wrapper'));
    closeDrawerMenu();
  });

  test('닫기 버튼 클릭하면 닫힌다', () => {
    const { getByText, closeDrawerMenu, clickOpenButton } = setup();

    clickOpenButton();
    userEvent.click(getByText('✖'));
    closeDrawerMenu();
  });
});
