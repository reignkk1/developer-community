import styled from "@emotion/styled";

export const Form = styled.form`
  display: flex;
  align-items: center;
  button {
    color: white;
    font-weight: bold;
    background-color: #0092fa;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: #0580d7;
    }
  }
  @media (max-width: 1065px) {
    display: none;
  }
`;
export const SearchInput = styled.input`
  background-color: ${(props) => props.theme.inputColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  outline: none;
  color: ${(props) => props.theme.textColor};
  padding: 5px 15px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
`;
