import { Link, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';

// File
import { isOpendDrawerMenu } from '../../store/atom';
import AvartarClickMenu from '../header/HeaderAvartarMenu';
import LoginSignUpBtn from '../header/HeaderLoginButtons';
import Menu from '../header/HeaderMenu';
import SearchBar from '../header/HeaderSearch';
import ThemeToggle from '../header/HeaderThemeButton';
import HambugerButton from '../header/HeaderHambugerButton';
import DrawerMenu from '../header/HeaderDrawerMenu';
import { useGetAxios } from '../../hooks/api/http';
import styled from '@emotion/styled';

const HeaderContainer = styled.header<{ pathname: String }>`
  display: ${props =>
    props.pathname === '/signup' ||
    props.pathname === '/login' ||
    props.pathname === '/account/password-change' ||
    props.pathname === '/account/withdraw-confirm'
      ? 'none'
      : 'flex'};
  width: 100%;
  height: 70px;
  background-color: ${props => props.theme.bgColor};
  border-bottom: 1px solid ${props => props.theme.borderColor};
  position: fixed;
  top: 0;
  z-index: 99;
  padding: 15px 0px;
`;

const HeaderBox = styled.div`
  width: 1300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    cursor: pointer;
  }
  @media (max-width: 1065px) {
    padding: 0px 25px;
  }
`;

const Wrapper = styled.div<{ isOpend: boolean }>`
  display: ${props => (props.isOpend ? 'block' : 'none')};
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100%;
  background-color: grey;
  opacity: 0.4;
`;
const Logo = styled.h1`
  color: #0092fa;
  font-size: 25px;
`;

// =============================================================================

export default function Header() {
  const location = useLocation();
  const [drawerMenuOpen, setDrawerMenuOpen] = useRecoilState(isOpendDrawerMenu);
  const { data: loginUser } = useGetAxios('/user/login-info');

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth > 1065 && setDrawerMenuOpen(false)
    );
  }, [setDrawerMenuOpen]);

  const menuData = [
    { name: '공지사항', path: '/notice' },
    { name: '사는얘기', path: '/life' },
    { name: 'Tech', path: '/tech' },
    { name: '방명록', path: '/guest-book' },
  ];

  return (
    <HeaderContainer pathname={location.pathname}>
      <HeaderBox>
        <Link to="/">
          <Logo>Developer</Logo>
        </Link>
        <Menu menu={menuData} />
        <SearchBar />
        <ThemeToggle />
        {loginUser ? <AvartarClickMenu /> : <LoginSignUpBtn />}
        <HambugerButton />
        {drawerMenuOpen ? <DrawerMenu /> : null}
      </HeaderBox>
      <Wrapper
        isOpend={drawerMenuOpen}
        onClick={() => setDrawerMenuOpen(current => !current)}
      />
    </HeaderContainer>
  );
}
