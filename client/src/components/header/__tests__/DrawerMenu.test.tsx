import '@testing-library/jest-dom';
import DrawerMenu from '../HeaderDrawerMenu';
import HambugerButton from '../HeaderHambugerButton';
import userEvent from '@testing-library/user-event';
import { renderWithTest } from '../../../utils/test/renderWithTest';

describe('DrawerMenu test', () => {
  const setup = () => {
    const utils = renderWithTest(
      <>
        <HambugerButton style={{ display: 'block' }} />
        <DrawerMenu />
      </>
    );
    return { ...utils };
  };

  test('햄버거 버튼 클릭하면 열린다', () => {
    const { getByRole, getByTestId } = setup();

    userEvent.click(getByRole('button'));
    expect(getByTestId('drawer_menu')).toBeInTheDocument();
  });

  test('바깥을 클릭하면 닫힌다', () => {
    const { queryByTestId, getByRole, getByTestId } = setup();

    userEvent.click(getByRole('button'));
    userEvent.click(getByTestId('drawerMenu_wrapper'));
    expect(queryByTestId('drawer_menu')).toHaveStyle('display:none');
  });

  test('닫기 버튼 클릭하면 닫힌다', () => {
    const { getByText, queryByTestId, getByRole } = setup();

    userEvent.click(getByRole('button'));
    userEvent.click(getByText('✖'));
    expect(queryByTestId('drawer_menu')).toHaveStyle('display:none');
  });
});
