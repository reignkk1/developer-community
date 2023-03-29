import { ReactNode } from "react";
import { useSetRecoilState } from "recoil";
import { isOpendAvartarMenu } from "../../../../atom";
import { Styles } from "./styles";

interface IMenuItem {
  children: ReactNode;
}

export default function MenuItem({ children }: IMenuItem) {
  const setIsOpend = useSetRecoilState(isOpendAvartarMenu);
  const closeMenu = () => setIsOpend(false);
  return (
    <Styles.AvartarMenuItem onClick={closeMenu}>
      {children}
    </Styles.AvartarMenuItem>
  );
}
