import styled from "@emotion/styled";

export const Container = styled.div`
  display: none;

  @media (max-width: 1065px) {
    display: block;
    padding: 5px;
    border-radius: 6px;
    svg {
      width: 30px;
      height: 30px;
      color: #0092fa;
    }
    cursor: pointer;
    &:hover {
      background-color: #e7e7e9;
    }
  }
`;
