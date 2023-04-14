import styled from "@emotion/styled";

export const Container = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? "block" : "none")};
  width: 250px;
  height: 100%;
  background-color: black;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 99;
  @media (min-width: 1065px) {
    display: none;
  }
`;
