import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { renderWithTest } from '../../../utils/test/renderWithTest';
import CategoryPostList from '../PostList';
import { IPost } from '../../../types/types';
import { Suspense } from 'react';
import { LoadingBox } from '../../common/LoadingError';

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

describe('Category Post List test', () => {
  const mock = new MockAdapter(axios);
  global.scrollTo = jest.fn();

  mock.onGet(`${process.env.REACT_APP_API}/article/tech/all`).reply(200, posts);

  const setup = () => {
    const utils = renderWithTest(
      <Suspense fallback={<LoadingBox />}>
        <CategoryPostList page="tech" />
      </Suspense>
    );
    return { ...utils };
  };

  test('Cateogry Post Fetch 후 List에 잘 나타난다', async () => {
    const { getByText, getByRole } = setup();

    const testKeyWord = ['testTitle', /2023. 6. 1./, '운영진'];

    for (const word of testKeyWord) {
      await waitFor(() => expect(getByText(word)).toBeInTheDocument());
    }
    await waitFor(() => {
      expect(getByRole('img')).toHaveAttribute('src', 'https://test.com');
      expect(getByText(1)).toBeInTheDocument();
    });
  });
});
