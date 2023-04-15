import { useRecoilState } from "recoil";
import {
  ButtonContainer,
  CloseButton,
  Container,
  Menu,
  MenuList,
} from "./styles";
import { isOpendDrawerMenu } from "../../../atom";
import { Link } from "react-router-dom";
import ThemeToggle from "../themeButton/ThemeButton";

export default function DrawerMenu() {
  const [drawerMenuOpen, setDrawerMenuOpen] = useRecoilState(isOpendDrawerMenu);

  const menuData = [
    { name: "공지사항", path: "/notice" },
    { name: "사는얘기", path: "/life" },
    { name: "Q & A", path: "/question" },
    { name: "오늘의 명언", path: "/quote" },
  ];

  const closeDrawerMenu = () => setDrawerMenuOpen(false);

  return (
    <Container open={drawerMenuOpen}>
      <ButtonContainer>
        <CloseButton onClick={closeDrawerMenu}>✖</CloseButton>
      </ButtonContainer>
      <ThemeToggle />
      <Menu>
        {menuData.map((item) => (
          <Link to={item.path} onClick={closeDrawerMenu}>
            <MenuList>{item.name}</MenuList>
          </Link>
        ))}
      </Menu>
    </Container>
  );
}
