import { useRecoilState } from "recoil";
import { Container } from "./styles";
import { isOpendDrawerMenu } from "../../../atom";

export default function DrawerMenu() {
  const [drawerMenuOpen, setDrawerMenuOpen] = useRecoilState(isOpendDrawerMenu);
  return (
    <Container open={drawerMenuOpen}>
      <button onClick={() => setDrawerMenuOpen(false)}>X</button>
    </Container>
  );
}
