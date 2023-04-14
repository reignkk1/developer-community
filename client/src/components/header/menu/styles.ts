import styled from "@emotion/styled";

export const Container = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1065px) {
    display: none;
  }
`;
export const MenuItem = styled.li`
  margin-right: 35px;
  font-weight: bold;
`;
