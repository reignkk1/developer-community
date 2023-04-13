import { ReactNode } from "react";

import styled from "@emotion/styled";

// =============================================================================

const Btn = styled.button`
  background-color: #0092fa;
  cursor: pointer;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 14px;
  &:hover {
    background-color: #0580d7;
  }
`;

interface IButton {
  onClick?(): void;
  children: ReactNode;
}
// =============================================================================

export default function Button({ onClick, children }: IButton) {
  return <Btn onClick={onClick}>{children}</Btn>;
}
