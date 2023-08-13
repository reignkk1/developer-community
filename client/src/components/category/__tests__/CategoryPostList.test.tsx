import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import TestWrapper from '../../../utils/test/TestWrapper';
import CategoryPostList from '../CategoryPostList';
import { IPost } from '../../../types/types';
import { useTestRecoilState } from '../../../utils/test/useTestRecoilState';
import { category } from '../../../store/atom';

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

  const [page, setPage] = useTestRecoilState(category);
  setPage('tech');

  mock
    .onGet(`${process.env.REACT_APP_API}/article/${page}/all`)
    .reply(200, posts);

  const setup = () => {
    const utils = render(
      <TestWrapper>
        <CategoryPostList />
      </TestWrapper>
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
    });
  });
});
