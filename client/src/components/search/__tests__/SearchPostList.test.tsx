import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';
import { renderWithTest } from '../../../utils/test/renderWithTest';
import axios from 'axios';
import { IPost } from '../../../types/types';
import { Suspense } from 'react';
import { LoadingBox } from '../../common/LoadingError';
import { waitFor } from '@testing-library/react';
import SearchPostList from '../SearchPostList';

const post: IPost[] = [
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
describe('SearchPostList test', () => {
  window.scrollTo = jest.fn();
  const setup = () => {
    const utils = renderWithTest(
      <Suspense fallback={<LoadingBox />}>
        <SearchPostList keyword="test" />
      </Suspense>
    );

    return { ...utils };
  };

  test('검색 키워드를 이용해 게시물을 fetch 후 보여준다', async () => {
    new MockAdapter(axios).onGet(`/search?keyword=test`).reply(200, post);
    const { getByText, getAllByAltText } = setup();

    const testWord = ['test', '김민겸', /2023. 4. 4./];

    await waitFor(() => {
      testWord.forEach(word => expect(getByText(word)).toBeInTheDocument());
      getAllByAltText('프로필').forEach(img => {
        expect(img).toHaveAttribute('src', 'https://test.com');
      });
    });
  });
});
