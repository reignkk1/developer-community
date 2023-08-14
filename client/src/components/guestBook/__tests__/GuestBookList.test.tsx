import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import { renderWithTest } from '../../../utils/test/renderWithTest';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { IPost, IUser } from '../../../types/types';
import GuestBookList from '../GuestBookList';
import { DateToday } from '../../../utils/DateToday';
import { category } from '../../../store/atom';
import { useTestRecoilState } from '../../../utils/test/useTestRecoilState';

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

const posts: IPost[] = [
  {
    id: 128,
    title: 'test',
    content: 'test',
    date: DateToday(),
    writerID: 12,
    nickname: '김민겸',
    page: 'guest-book',
    avartar: 'https://test.com',
  },
];
describe('GuestBook test', () => {
  const mock = new MockAdapter(axios);

  const [page, setPage] = useTestRecoilState(category);
  setPage('guest-book');

  mock
    .onGet(`${process.env.REACT_APP_API}/user/login-info`)
    .reply(200, loginUser);

  mock
    .onGet(`${process.env.REACT_APP_API}/article/${page}/all`)
    .reply(200, posts);

  const setup = () => {
    const utils = renderWithTest(<GuestBookList />);

    return { ...utils };
  };

  test('방명록 리스트가 잘 보여진다', async () => {
    const { getByText, getByRole } = setup();

    const testKeyWord = ['test', '김민겸', '삭제'];

    for (const word of testKeyWord) {
      await waitFor(() => expect(getByText(word)).toBeInTheDocument());
    }
    await waitFor(() =>
      expect(getByRole('img')).toHaveAttribute('src', 'https://test.com')
    );
  });
});
