import '@testing-library/jest-dom';
import PostList from '../HomePostList';
import { waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { renderWithTest } from '../../../utils/test/renderWithTest';
import { IPost } from '../../../types/types';
import { Suspense } from 'react';
import { LoadingBox } from '../../common/LoadingError';

describe('PostList test', () => {
  const posts: IPost[] = [
    {
      id: 125,
      title: 'testTitle ',
      content: 'test',
      date: '2023. 6. 1.',
      writerID: 12,
      nickname: '운영진',
      page: 'tech',
      avartar: 'https://test.com',
    },
  ];

  const mock = new MockAdapter(axios);

  mock
    .onGet(`${process.env.REACT_APP_API}/article/notice/all`)
    .reply(200, posts);

  const setup = () => {
    const utils = renderWithTest(
      <Suspense fallback={<LoadingBox />}>
        <PostList page="notice" />
      </Suspense>
    );
    return { ...utils };
  };

  test('Post Fetch 후 List에 잘 나타난다', async () => {
    const { getByText, getByRole } = setup();

    const testKeyWord = ['testTitle', /2023. 6. 1./, '운영진'];

    for (const word of testKeyWord) {
      await waitFor(() => {
        expect(getByText(word)).toBeInTheDocument();
      });
    }
    await waitFor(() => {
      expect(getByRole('img')).toHaveAttribute('src', 'https://test.com');
    });
  });
});
