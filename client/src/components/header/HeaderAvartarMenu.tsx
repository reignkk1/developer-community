import axios from 'axios';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isOpendAvartarMenu } from '../../store/atom';
import Avartar from '../common/Avartar';
import { useGetAxios } from '../../hooks/api/http';
import { IUser } from '../../../types/types';
import styled from '@emotion/styled';

const Container = styled.div`
  img {
    position: relative;
  }
  @media (max-width: 1065px) {
    img {
      display: none;
    }
  }
`;

const AvartarMenuBox = styled.div`
  width: 220px;
  height: 180px;
  border: 1px solid ${props => props.theme.borderColor};
  position: absolute;
  right: 50px;
  top: 70px;
  border-radius: 5px;
  background-color: ${props => props.theme.bgColor};
`;

const AvartarMenu = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 130px;
  padding: 10px 40px;
`;

const AvartarMenuItem = styled.li`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 5px;

  a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.textColor};
    &:hover {
      color: #0092fa;
    }
  }
`;

const LogoutBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  cursor: pointer;
  border-top: 1px solid ${props => props.theme.borderColor};
  padding: 25px 40px;
  font-weight: bold;
  &:hover {
    color: #0092fa;
  }
`;

export default function AvartarClickMenu() {
  const [isOpend, setIsOpend] = useRecoilState(isOpendAvartarMenu);
  const { data: loginUser } = useGetAxios<IUser>('/user/login-info');

  const menuItem = [
    {
      to: '/profile',
      name: '내 프로필',
    },
    {
      to: '/account',
      name: '내 계정',
    },
    {
      to: `/user/${loginUser?.id}/posts`,
      name: '활동 내역',
    },
  ];

  useEffect(() => {
    window.addEventListener('resize', () => setIsOpend(false));
  }, [setIsOpend]);

  const avartarMenu = useRef<HTMLDivElement>(null);
  const avartar = useRef<HTMLImageElement>(null);

  const onClickAvartar = () => setIsOpend(current => !current);

  useEffect(() => {
    const onClickOutside = (e: any) => {
      if (
        !avartarMenu.current?.contains(e.target) &&
        !avartar.current?.contains(e.target)
      )
        setIsOpend(false);
    };
    if (isOpend) document.addEventListener('mousedown', onClickOutside);

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [setIsOpend, isOpend]);

  const handleLogout = () =>
    axios.post('/user/logout').then(() => window.location.reload());
  return (
    <Container>
      <Avartar
        width="35px"
        heigth="35px"
        onClick={onClickAvartar}
        src={loginUser?.avartar}
        refAvartar={avartar}
      />
      {isOpend ? (
        <AvartarMenuBox ref={avartarMenu}>
          <AvartarMenu>
            {menuItem.map(item => (
              <AvartarMenuItem
                key={item.name}
                onClick={() => setIsOpend(false)}
              >
                <Link to={item.to}>{item.name}</Link>
              </AvartarMenuItem>
            ))}
          </AvartarMenu>
          <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
        </AvartarMenuBox>
      ) : null}
    </Container>
  );
}
