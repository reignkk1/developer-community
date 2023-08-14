import '@testing-library/jest-dom';
import PostList from '../HomePostList';
import { waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { renderWithTest } from '../../../utils/test/renderWithTest';

describe('PostList test', () => {
  const posts = [
    {
      id: 25,
      title: 'testTitle',
      date: '2023. 3. 11.',
      nickname: '운영진',
      avartar: 'https://test.com',
    },
  ];

  const mock = new MockAdapter(axios);

  mock
    .onGet(`${process.env.REACT_APP_API}/article/notice/all`)
    .reply(200, posts);

  const setup = () => {
    const utils = renderWithTest(<PostList page="notice" />);
    return { ...utils };
  };

  test('Post Fetch 후 List에 잘 나타난다', async () => {
    const { getByText, getByRole } = setup();

    const testKeyWord = ['testTitle', /2023. 3. 11./, '운영진'];

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
