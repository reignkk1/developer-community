import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RecoilRoot } from 'recoil';
import { isOpendAvartarMenu } from '../../../store/atom';
import AvartarClickMenu from '../HeaderAvartarMenu';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { RecoilObserver } from '../../../utils/RecoilObserver';
import { LocationDisplay } from '../../../utils/LocationDisplay';
import axios from 'axios';

describe('AvartarMenu test', () => {
  const setup = () => {
    const client = new QueryClient();
    const onClick = jest.fn();
    const utils = render(
      <RecoilRoot>
        <QueryClientProvider client={client}>
          <MemoryRouter>
            <LocationDisplay />
            <RecoilObserver node={isOpendAvartarMenu} onClick={onClick} />
            <AvartarClickMenu />
          </MemoryRouter>
        </QueryClientProvider>
      </RecoilRoot>
    );

    return { ...utils, onClick };
  };

  test('아바타 프로필 클릭 시 AvartarMenu Toggle 된다.', () => {
    const { getByRole, getByText, getByTestId, onClick } = setup();

    const loginUserID = undefined;

    const avartarMenu = [
      {
        path: '/profile',
        name: '내 프로필',
      },
      {
        path: '/account',
        name: '내 계정',
      },
      {
        path: `/user/${loginUserID}/posts`,
        name: '활동 내역',
      },
    ];

    expect(onClick).toHaveBeenCalledWith(false);
    userEvent.click(getByRole('img'));
    expect(onClick).toHaveBeenLastCalledWith(true);

    avartarMenu.forEach(menu =>
      expect(getByText(menu.name)).toBeInTheDocument()
    );
    avartarMenu.forEach(menu => {
      userEvent.click(getByText(menu.name));
      expect(getByTestId('pathName')).toHaveTextContent(menu.path);
      userEvent.click(getByRole('img'));
    });
  });
});
