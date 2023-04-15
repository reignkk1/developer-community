import { useSetRecoilState } from "recoil";
import { isOpendDrawerMenu } from "../../../atom";
import { Container } from "./styles";

export default function HambugerButton() {
  const setDrawerMenuOpen = useSetRecoilState(isOpendDrawerMenu);
  return (
    <Container onClick={() => setDrawerMenuOpen((current) => !current)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        ></path>
      </svg>
    </Container>
  );
}