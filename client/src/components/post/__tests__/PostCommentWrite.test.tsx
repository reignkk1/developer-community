import '@testing-library/jest-dom';
import { renderWithTest } from '../../../utils/test/renderWithTest';
import PostCommentWrite from '../PostCommentWrite';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { waitFor } from '@testing-library/react';

describe('PostCommentWrite test', () => {
  const setup = () => {
    const utils = renderWithTest(<PostCommentWrite page="tech" />);

    return { ...utils };
  };

  test('로그인을 하지 않으면 댓글을 작성하지 못한다.', () => {
    const { getByText } = setup();

    expect(getByText('댓글쓰기')).toBeDisabled();
  });

  test('로그인을 하면 댓글을 작성할 수 있다.', async () => {
    const mock = new MockAdapter(axios);
    document.execCommand = jest.fn();

    mock.onGet(`${process.env.REACT_APP_API}/user/login-info`).reply(200, true);
    const { getByText } = setup();

    await waitFor(() => {
      expect(getByText('댓글쓰기')).not.toBeDisabled();
    });
  });
});
