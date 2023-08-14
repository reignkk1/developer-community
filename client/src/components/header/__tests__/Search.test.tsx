import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import SearchBar from '../HeaderSearch';
import { renderWithTest } from '../../../utils/test/renderWithTest';
import userEvent from '@testing-library/user-event';
import { LocationDisplay } from '../../../utils/test/LocationDisplay';

describe('Search test', () => {
  const setup = () => {
    const utils = renderWithTest(
      <>
        <LocationDisplay />
        <SearchBar />
      </>
    );

    return { ...utils };
  };

  test('input에 입력하면 value가 바뀐다', () => {
    const { getByRole } = setup();

    userEvent.type(getByRole('textbox'), 'test');
    expect(getByRole('textbox')).toHaveValue('test');
  });

  test('검색 버튼을 누르면 검색 페이지로 이동한다.', async () => {
    const { getByRole, getByTestId } = setup();
    userEvent.type(getByRole('textbox'), 'test');
    userEvent.click(getByRole('button'));
    await waitFor(() => {
      expect(getByTestId('pathName')).toHaveTextContent('/search?keyword=test');
    });
  });

  test('아무것도 입력하지 않고 검색하면 alert 창이 뜬다 ', async () => {
    const { getByRole } = setup();
    window.alert = jest.fn();

    userEvent.click(getByRole('button'));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('검색어를 입력해주세요.');
    });
  });
});
