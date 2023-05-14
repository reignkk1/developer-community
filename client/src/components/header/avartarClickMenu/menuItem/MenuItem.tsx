import { ReactNode } from "react";
import { useSetRecoilState } from "recoil";
import { isOpendAvartarMenu } from "../../../../atom";
import { AvartarMenuItem } from "./styles";

interface IMenuItem {
  children: ReactNode;
}

export default function MenuItem({ children }: IMenuItem) {
  const setIsOpend = useSetRecoilState(isOpendAvartarMenu);
  const closeMenu = () => setIsOpend(false);
  return <AvartarMenuItem onClick={closeMenu}>{children}</AvartarMenuItem>;
}
