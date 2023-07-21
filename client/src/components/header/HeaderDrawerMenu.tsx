import { useRecoilState } from 'recoil';
import { isOpendDrawerMenu } from '../../store/atom';
import { Link } from 'react-router-dom';
import ThemeToggle from './HeaderThemeButton';
import axios from 'axios';
import Avartar from '../common/Avartar';
import { useGetAxios } from '../../hooks/api/http';
import { IUser } from '../../../types/types';
import styled from '@emotion/styled';

const Container = styled.div<{ open: boolean }>`
  display: ${props => (props.open ? 'block' : 'none')};
  width: 250px;
  height: 100%;
  background-color: ${props => props.theme.bgColor};
  position: fixed;
  top: 0;
  right: 0;
  z-index: 99;
  border-top-left-radius: 35px;
  border-bottom-left-radius: 35px;
  @media (min-width: 1065px) {
    display: none;
  }
  button {
    display: block;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  margin: 10px 10px 0px 0px;
  background-color: ${props => props.theme.bgColor};
  border: none;
  color: grey;
  font-size: 20px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 10px;
  margin-bottom: 20px;
  &:hover {
    color: var(--blue);
    background-color: #e7e7e9;
  }
`;

const Menu = styled.ul`
  margin: 0px 5px;
`;
const MenuList = styled.li`
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 15px 10px;
  font-size: 15px;
  font-weight: bold;
  color: ${props => props.theme.textColor};
  &:hover {
    color: var(--blue);
    background-color: ${props => props.theme.bgUserInfoMenuColor};
  }
`;

const Theme = styled.div`
  display: flex;
  justify-content: center;
`;

const SignBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  font-size: 14px;
  a {
    color: ${props => props.theme.textColor};
  }
  a:hover {
    color: var(--blue);
  }
`;

const LogOut = styled.div`
  color: ${props => props.theme.textColor};
  cursor: pointer;
  &:hover {
    color: var(--blue);
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  img {
    margin-right: 10px;
  }
`;

export default function DrawerMenu() {
  const [drawerMenuOpen, setDrawerMenuOpen] = useRecoilState(isOpendDrawerMenu);
  const { data: loginUser } = useGetAxios<IUser>('/user/login-info');

  const menuData = [
    { name: '공지사항', path: '/notice' },
    { name: '사는얘기', path: '/life' },
    { name: 'Q & A', path: '/question' },
    { name: '오늘의 명언', path: '/quote' },
  ];

  const closeDrawerMenu = () => setDrawerMenuOpen(false);

  const onClick = () => {
    axios.post('/user/logout').then(() => {
      window.location.reload();
    });
  };

  return (
    <Container open={drawerMenuOpen}>
      <ButtonContainer>
        <CloseButton onClick={closeDrawerMenu}>✖</CloseButton>
      </ButtonContainer>
      {loginUser ? (
        <UserInfo>
          <Link to="/profile" onClick={closeDrawerMenu}>
            <Avartar src={loginUser.avartar} width="40px" heigth="40px" />
          </Link>
        </UserInfo>
      ) : null}
      <Menu>
        {menuData.map(item => (
          <Link key={item.name} to={item.path} onClick={closeDrawerMenu}>
            <MenuList>{item.name}</MenuList>
          </Link>
        ))}
      </Menu>
      <Theme>
        <ThemeToggle />
      </Theme>
      <SignBox>
        {loginUser ? (
          <LogOut onClick={onClick}>로그아웃</LogOut>
        ) : (
          <>
            <Link to="/login">로그인 </Link>
            <span style={{ cursor: 'default', margin: '0px 10px' }}> / </span>
            <Link to="/signup"> 회원가입</Link>
          </>
        )}
      </SignBox>
    </Container>
  );
}
