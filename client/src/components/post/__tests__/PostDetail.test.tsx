import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';
import { renderWithTest } from '../../../utils/test/renderWithTest';
import axios from 'axios';
import { IPost, IUser } from '../../../types/types';
import { Suspense } from 'react';
import { LoadingBox } from '../../common/LoadingError';
import { waitFor } from '@testing-library/react';
import Post from '../Post';

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

const post: IPost = {
  id: 54,
  title: 'test',
  content: 'test2',
  date: '2023. 4. 4.',
  writerID: 12,
  nickname: '김민겸',
  page: 'tech',
  avartar: 'https://test.com',
};
describe('PostDetail test', () => {
  const mock = new MockAdapter(axios);
  document.execCommand = jest.fn();

  mock.onGet(`/${process.env.REACT_APP_API}/article/12`).reply(200, post);

  mock
    .onGet(`${process.env.REACT_APP_API}/user/login-info`)
    .reply(200, loginUser);

  const setup = () => {
    const utils = renderWithTest(
      <Suspense fallback={<LoadingBox />}>
        <Post section="tech" id="12" />
      </Suspense>
    );

    return { ...utils };
  };

  test('게시물 fetch 후 렌더링 된다.', async () => {
    const { getByText, getAllByAltText } = setup();

    const testWord = ['test', 'test2', '김민겸', /2023. 4. 4./, '삭제', '수정'];

    await waitFor(() => {
      testWord.forEach(word => expect(getByText(word)).toBeInTheDocument());
      getAllByAltText('프로필').forEach(img => {
        expect(img).toHaveAttribute('src', 'https://test.com');
      });
    });
  });
});
