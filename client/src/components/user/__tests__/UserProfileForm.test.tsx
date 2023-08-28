import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';
import { renderWithTest } from '../../../utils/test/renderWithTest';
import axios from 'axios';
import { IUser } from '../../../types/types';
import { Suspense } from 'react';
import { LoadingBox } from '../../common/LoadingError';
import userEvent from '@testing-library/user-event';
import UserProgileForm from '../UserProfileForm';
import { waitFor } from '@testing-library/react';

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

describe('UserProfileForm test', () => {
  window.alert = jest.fn();
  const mock = new MockAdapter(axios);

  mock
    .onGet(`${process.env.REACT_APP_API}/user/login-info`)
    .reply(200, loginUser);
  mock
    .onPatch(`${process.env.REACT_APP_API}/user/profile`, {
      name: 'test',
      nickname: 'test2',
    })
    .reply(200);

  const setup = () => {
    const utils = renderWithTest(
      <Suspense fallback={<LoadingBox />}>
        <UserProgileForm />
      </Suspense>
    );

    return { ...utils };
  };

  test('유저 이름과 닉네임이 잘 변경 된다.', async () => {
    const { getByLabelText, getByText } = setup();

    await waitFor(() => {
      userEvent.type(getByLabelText('이름'), 'test');
      userEvent.type(getByLabelText('닉네임'), 'test2');
      userEvent.click(getByText('저장'));
    });

    expect(mock.history.patch.length).toBe(1);
  });
});
