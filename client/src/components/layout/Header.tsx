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
import styled from '@emotion/styled';
import useLoginUser from '../../hooks/useLoginUser';
import sectionHeader from '../../sectionHeader.json';

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

const Logo = styled.h1`
  color: #0092fa;
  font-size: 25px;
`;

// =============================================================================

export default function Header() {
  const [drawerMenuOpen, setDrawerMenuOpen] = useRecoilState(isOpendDrawerMenu);
  const location = useLocation();
  const loginUser = useLoginUser();

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth > 1065 && setDrawerMenuOpen(false)
    );
  }, [setDrawerMenuOpen]);

  const { logoTitle, menu } = sectionHeader;

  return (
    <HeaderContainer pathname={location.pathname}>
      <HeaderBox>
        <Link to="/">
          <Logo>{logoTitle}</Logo>
        </Link>
        <Menu menu={menu} />
        <SearchBar />
        <ThemeToggle />
        {loginUser ? <AvartarClickMenu /> : <LoginSignUpBtn />}
        <HambugerButton />
        {drawerMenuOpen ? <DrawerMenu /> : null}
      </HeaderBox>
    </HeaderContainer>
  );
}
