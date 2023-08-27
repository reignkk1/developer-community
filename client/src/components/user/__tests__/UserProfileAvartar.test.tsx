import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';
import { renderWithTest } from '../../../utils/test/renderWithTest';
import axios from 'axios';
import { IUser } from '../../../types/types';
import { Suspense } from 'react';
import { LoadingBox } from '../../common/LoadingError';
import UserProfileAvartar from '../UserProfileAvartar';
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

describe('UserProfileAvartar test', () => {
  new MockAdapter(axios)
    .onGet(`${process.env.REACT_APP_API}/user/login-info`)
    .reply(200, loginUser);

  const setup = () => {
    const utils = renderWithTest(
      <Suspense fallback={<LoadingBox />}>
        <UserProfileAvartar />
      </Suspense>
    );

    return { ...utils };
  };

  test('프로필 변경이 잘 된다.', async () => {
    const mock = new MockAdapter(axios);
    mock.onPost(`/${process.env.REACT_APP_API}/user/upload`).reply(200);

    const { findByLabelText } = setup();
    const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });
    userEvent.upload(await findByLabelText('변경'), fakeFile);

    expect(mock.history.post.length).toBe(1);
  });
});
