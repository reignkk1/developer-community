import '@testing-library/jest-dom';
import Category from '../HomePostTitle';
import userEvent from '@testing-library/user-event';
import { renderWithTest } from '../../../utils/test/renderWithTest';
import { LocationDisplay } from '../../../utils/test/LocationDisplay';

describe('PostTitle test', () => {
  const props = {
    to: '/notice',
    children: '공지사항',
  };
  const setup = () => {
    const utils = renderWithTest(
      <>
        <LocationDisplay />
        <Category {...props} />
      </>
    );
    return { ...utils };
  };

  test('클릭하면 해당 카테고리로 이동한다', async () => {
    const { getByText, getByTestId } = setup();
    userEvent.click(getByText('공지사항'));
    expect(getByTestId('pathName')).toHaveTextContent('/notice');
  });
});
