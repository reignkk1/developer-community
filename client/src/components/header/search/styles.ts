import styled from "@emotion/styled";

const Form = styled.form`
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
`;
const SearchBar = styled.input`
  background-color: ${(props) => props.theme.inputColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  outline: none;
  color: ${(props) => props.theme.textColor};
  padding: 5px 15px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
`;

export const Styles = {
  Form,
  SearchBar,
};
