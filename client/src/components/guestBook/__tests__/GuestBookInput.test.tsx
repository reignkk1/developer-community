import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import GuestBookInput from '../GuestBookInput';
import userEvent from '@testing-library/user-event';
import TestWrapper from '../../../utils/test/TestWrapper';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { IUser } from '../../../types/types';
import { DateToday } from '../../../utils/DateToday';

const loginUser: IUser = {
  id: 12,
  userID: 'asdasd',
  password: '$2a$10$X330pVNIvH5.3c4AOwaJ5ey6cWcFq3eAUF/BZ5xeUkwsh1um/D2ie',
  email: 'asdasd@asd',
  name: '홍길동',
  nickname: '김민겸',
  create_time: '2023. 4. 4.',
  manager: 0,
  avartar:
    'https://developer-community.s3.ap-northeast-2.amazonaws.com/ef05ca08eb642e7435be63aaa68e6bba',
};
const data = {
  title: 'test',
  content: 'test',
  date: DateToday(),
};

describe('GuestBook test', () => {
  const mock = new MockAdapter(axios);
  window.alert = jest.fn();

  mock
    .onGet(`${process.env.REACT_APP_API}/user/login-info`)
    .reply(200, loginUser);

  mock
    .onPost(`${process.env.REACT_APP_API}/article/guest-book`, data)
    .reply(200);

  const setup = () => {
    const utils = render(
      <TestWrapper>
        <GuestBookInput />
      </TestWrapper>
    );

    return { ...utils };
  };

  test('방명록 input 버튼 클릭하면 POST 요청이 잘 된다', async () => {
    const { getByRole } = setup();

    userEvent.type(getByRole('textbox'), 'test');
    expect(getByRole('textbox')).toHaveValue('test');

    await waitFor(() => {
      userEvent.click(getByRole('button'));
      expect(getByRole('textbox')).toHaveValue('');
    });
  });
});
