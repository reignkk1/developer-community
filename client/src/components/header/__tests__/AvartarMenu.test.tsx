import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AvartarClickMenu from '../HeaderAvartarMenu';
import { LocationDisplay } from '../../../utils/test/LocationDisplay';
import { renderWithTest } from '../../../utils/test/renderWithTest';
import { IUser } from '../../../types/types';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

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

const avartarMenu = [
  {
    path: '/profile',
    name: '내 프로필',
  },
  {
    path: '/account',
    name: '내 계정',
  },
];

describe('AvartarMenu test', () => {
  const mock = new MockAdapter(axios);

  mock
    .onGet(`${process.env.REACT_APP_API}/user/login-info`)
    .reply(200, loginUser);

  const setup = () => {
    const openAvartarMenu = async () => {
      expect(
        await screen.queryByTestId('avartar_menu')
      ).not.toBeInTheDocument();
      userEvent.click(screen.getByRole('img'));
      expect(screen.getByTestId('avartar_menu')).toBeInTheDocument();
    };

    const utils = renderWithTest(
      <>
        <LocationDisplay />
        <AvartarClickMenu />
      </>
    );

    return { ...utils, avartarMenu, openAvartarMenu };
  };

  test('아바타 프로필 클릭하면 메뉴가 열린다.', async () => {
    const { avartarMenu, getByText, openAvartarMenu } = setup();

    openAvartarMenu();

    await waitFor(() =>
      avartarMenu.forEach(menu =>
        expect(getByText(menu.name)).toBeInTheDocument()
      )
    );
  });

  test('바깥을 클릭하면 메뉴가 닫힌다', async () => {
    const { queryByTestId, openAvartarMenu } = setup();

    openAvartarMenu();

    await waitFor(async () => {
      userEvent.click(document.body);
      expect(await queryByTestId('avartar_menu')).not.toBeInTheDocument();
    });
  });

  test('메뉴 클릭 시 해당 주소로 이동한다', async () => {
    const { getByText, getByTestId, openAvartarMenu } = setup();

    openAvartarMenu();

    await waitFor(() => {
      userEvent.click(getByText('내 프로필'));
    });
    expect(getByTestId('pathName')).toHaveTextContent(`/profile`);
  });
});
