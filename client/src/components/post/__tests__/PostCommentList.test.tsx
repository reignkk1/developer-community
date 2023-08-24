import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';
import { renderWithTest } from '../../../utils/test/renderWithTest';
import axios from 'axios';
import { IComment, IUser } from '../../../types/types';
import { Suspense } from 'react';
import { LoadingBox } from '../../common/LoadingError';
import { waitFor } from '@testing-library/react';
import PostCommentList from '../PostCommentList';

const comment: IComment[] = [
  {
    id: 54,
    text: 'test',
    date: '2023. 4. 4.',
    writerID: 12,
    nickname: '김민겸',
    page: 'tech',
    avartar: 'https://test.com',
    parentID: 13,
    postID: 10,
  },
];

describe('PostCommentList test', () => {
  const mock = new MockAdapter(axios);
  document.execCommand = jest.fn();

  mock
    .onGet(`/${process.env.REACT_APP_API}/article/tech/12/comments`)
    .reply(200, comment);
  const setup = () => {
    const utils = renderWithTest(
      <Suspense fallback={<LoadingBox />}>
        <PostCommentList page="tech" id="12" />
      </Suspense>
    );

    return { ...utils };
  };

  test('댓글 갯수가 잘 렌더링 된다.', async () => {
    const { getByText } = setup();

    await waitFor(() => expect(getByText('1개의 댓글')).toBeInTheDocument());
  });
});
