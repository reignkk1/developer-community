import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Category from '../HomePostTitle';
import userEvent from '@testing-library/user-event';
import TestWrapper from '../../tests/TestWrapper';
import { LocationDisplay } from '../../tests/LocationDisplay';

describe('PostTitle test', () => {
  const props = {
    to: '/notice',
    children: '공지사항',
  };
  const setup = () => {
    const utils = render(
      <TestWrapper>
        <LocationDisplay />
        <Category {...props} />
      </TestWrapper>
    );
    return { ...utils };
  };

  test('클릭하면 해당 카테고리로 이동한다', async () => {
    const { getByText, getByTestId } = setup();
    userEvent.click(getByText('공지사항'));
    expect(getByTestId('pathName')).toHaveTextContent('/notice');
  });
});
