import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';
import { renderWithTest } from '../../../utils/test/renderWithTest';
import axios from 'axios';
import { IComment, IUser } from '../../../types/types';
import { fireEvent, waitFor } from '@testing-library/react';
import PostCommentItem from '../PostCommentItem';
import userEvent from '@testing-library/user-event';

const loginUser: IUser = {
  id: 12,
  userID: 'asdasd',
  password: '$2a$10$X330pVNIvH5.3c4AOwaJ5ey6cWcFq3eAUF/BZ5xeUkwsh1um/D2ie',
  email: 'asdasd@asd',
  name: '홍길동',
  nickname: '김민겸',
  create_time: '2023. 4. 4.',
  manager: 0,
  avartar: 'https://test.com',
};

const comment: IComment = {
  id: 54,
  text: 'test',
  date: '2023. 4. 4.',
  writerID: 12,
  nickname: '김민겸',
  page: 'tech',
  avartar: 'https://test.com',
  parentID: 13,
  postID: 10,
};
describe('PostCommentList test', () => {
  window.confirm = jest.fn();
  global.confirm = () => true;
  window.alert = jest.fn();

  const setup = () => {
    const utils = renderWithTest(<PostCommentItem comment={comment} />);

    return { ...utils };
  };

  test('댓글이 잘 렌더링 된다.', () => {
    const { getByText, getByAltText, queryByText } = setup();

    const testWord = ['test', '김민겸', /2023. 4. 4./];

    testWord.forEach(word => expect(getByText(word)).toBeInTheDocument());
    expect(getByAltText('프로필')).toHaveAttribute('src', 'https://test.com');
    expect(queryByText('삭제')).not.toBeInTheDocument();
    expect(queryByText('수정')).not.toBeInTheDocument();
  });

  test('댓글 작성자가 로그인 시 수정 삭제 버튼이 보인다.', async () => {
    const mock = new MockAdapter(axios);
    mock
      .onGet(`${process.env.REACT_APP_API}/user/login-info`)
      .reply(200, loginUser);

    const { getByText } = setup();

    await waitFor(() => {
      expect(getByText('삭제')).toBeInTheDocument();
      expect(getByText('수정')).toBeInTheDocument();
    });
  });

  test('댓글 삭제 버튼 클릭 시 삭제된다.', async () => {
    const mock = new MockAdapter(axios);
    mock
      .onGet(`${process.env.REACT_APP_API}/user/login-info`)
      .reply(200, loginUser);
    mock.onDelete(`${process.env.REACT_APP_API}/comment/54`).reply(200);

    const { getByText } = setup();

    await waitFor(() => userEvent.click(getByText('삭제')));
    expect(mock.history.delete.length).toBe(1);
  });

  test('수정 버튼 클릭 시 댓글이 수정된다.', async () => {
    const mock = new MockAdapter(axios);
    mock
      .onGet(`${process.env.REACT_APP_API}/user/login-info`)
      .reply(200, loginUser);
    mock.onPatch(`${process.env.REACT_APP_API}/comment/54`).reply(200);
    const { getByText, getByRole } = setup();

    await waitFor(() => {
      userEvent.click(getByText('수정'));
      expect(getByRole('textbox')).toBeInTheDocument();
      fireEvent.change(getByRole('textbox'), {
        target: { value: 'testModify' },
      });
      expect(getByRole('textbox')).toHaveValue('testModify');
      userEvent.click(getByText('수정완료'));
      expect(mock.history.patch.length).toBe(1);
    });
  });

  test('수정모드에서 취소 버튼 클릭 시 수정모드가 해제된다.', async () => {
    const mock = new MockAdapter(axios);
    mock
      .onGet(`${process.env.REACT_APP_API}/user/login-info`)
      .reply(200, loginUser);
    const { getByText, getByRole, queryByRole } = setup();

    await waitFor(() => {
      userEvent.click(getByText('수정'));
      expect(getByRole('textbox')).toBeInTheDocument();
      userEvent.click(getByText('취소'));
      expect(queryByRole('textbox')).not.toBeInTheDocument();
    });
  });
});
