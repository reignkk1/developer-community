import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';
import { renderWithTest } from '../../../utils/test/renderWithTest';
import axios from 'axios';
import { IUser } from '../../../types/types';
import { Suspense } from 'react';
import { LoadingBox } from '../../common/LoadingError';
import UserInfoContainer from '../UserInfoContainer';
import { LocationDisplay } from '../../../utils/test/LocationDisplay';
import userEvent from '@testing-library/user-event';

const user: IUser = {
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

describe('PostDetail test', () => {
  new MockAdapter(axios).onGet(`/user/12`).reply(200, user);

  const setup = () => {
    const utils = renderWithTest(
      <Suspense fallback={<LoadingBox />}>
        <LocationDisplay />
        <UserInfoContainer userId="12" />
      </Suspense>
    );

    return { ...utils };
  };

  test('유저ID로 정보를 fetch 후 보여준다.', async () => {
    const { findByText, findByAltText } = setup();

    expect(await findByText('김민겸')).toBeInTheDocument();
    expect(await findByAltText('프로필')).toHaveAttribute(
      'src',
      'https://test.com'
    );
  });

  test('게시물, 댓글 클릭 시 해당 경로로 이동한다.', async () => {
    const { findByText, findByTestId } = setup();

    expect(await findByText('게시물')).toBeInTheDocument();
    expect(await findByText('댓글')).toBeInTheDocument();

    userEvent.click(await findByText('댓글'));
    expect((await findByTestId('pathName')).innerHTML).toBe(
      '/user/12/comments'
    );
    userEvent.click(await findByText('게시물'));
    expect((await findByTestId('pathName')).innerHTML).toBe('/user/12/posts');
  });
});
