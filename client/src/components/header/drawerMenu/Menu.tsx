import { useRecoilState } from "recoil";
import { Container } from "./styles";
import { isOpendDrawerMenu } from "../../../atom";
import { useEffect } from "react";

export default function DrawerMenu() {
  const [drawerMenuOpen, setDrawerMenuOpen] = useRecoilState(isOpendDrawerMenu);

  return (
    <Container open={drawerMenuOpen}>
      <button onClick={() => setDrawerMenuOpen(false)}>X</button>
    </Container>
  );
}
