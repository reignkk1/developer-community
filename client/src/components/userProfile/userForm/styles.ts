import styled from "@emotion/styled";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  input {
    margin-bottom: 25px;
  }
`;
export const Input = styled.input`
  width: 100%;
  margin-bottom: 20px;
  padding: 10px 15px;
  border-radius: 5px;
  outline: none;
  color: ${(props) => props.theme.textColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.inputColor};
  font-size: 17px;
  &:focus {
    border-color: ${(props) => props.theme.textColor};
  }
`;
export const Label = styled.label`
  margin-bottom: 5px;
`;
