import styled from "@emotion/styled";

export const Container = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? "block" : "none")};
  width: 250px;
  height: 100%;
  background-color: red;
  position: fixed;
  top: 0;
  right: 0;

  @media (min-width: 1065px) {
    display: none;
  }
`;
