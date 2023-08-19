import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';
import { renderWithTest } from '../../../utils/test/renderWithTest';
import ActivityList from '../ActivityList';
import axios from 'axios';
import { waitFor } from '@testing-library/react';
import { Suspense } from 'react';
import { LoadingBox } from '../../common/LoadingError';
import { IPost } from '../../../types/types';

describe('Activity List test', () => {
  const mock = new MockAdapter(axios);

  window.scrollTo = jest.fn();

  const posts: IPost[] = [
    {
      id: 54,
      title: 'test',
      content: 'test2',
      date: '2023. 4. 4.',
      writerID: 12,
      nickname: '김민겸',
      page: 'tech',
      avartar: 'https://test.com',
    },
  ];

  mock.onGet(`/${process.env.REACT_APP_API}/user/posts/12`).reply(200, posts);

  const setup = () => {
    const utils = renderWithTest(
      <Suspense fallback={<LoadingBox />}>
        <ActivityList page="posts" userId="12" />
      </Suspense>
    );

    return { ...utils };
  };

  test('활동내역이 잘 렌더링 된다.', async () => {
    const { getByText } = setup();

    const testWord = [
      'test',
      '2023. 4. 4.',
      'Tech',
      '에 게시물을 작성하였습니다.',
      '1',
    ];

    for (const word of testWord) {
      await waitFor(() => expect(getByText(word)).toBeInTheDocument());
    }
  });
});
