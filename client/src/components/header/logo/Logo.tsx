import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Styles } from "./styles";

interface ILogoTitle {
  children: ReactNode;
}

export default function Logo({ children }: ILogoTitle) {
  return (
    <Link to="/">
      <Styles.Title>{children}</Styles.Title>
    </Link>
  );
}
