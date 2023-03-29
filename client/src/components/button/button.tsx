import { ReactNode } from "react";
import { Styles } from "./styles";

// =============================================================================

interface IButton {
  onClick?(): void;
  children: ReactNode;
}
// =============================================================================

export default function Button({ onClick, children }: IButton) {
  return <Styles.Button onClick={onClick}>{children}</Styles.Button>;
}
