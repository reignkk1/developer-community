import styled from "@emotion/styled";

const ThemeBtn = styled.button`
  width: 130px;
  text-align: center;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgThemeBtnColor};
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 8px 15px 8px 5px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.textColor};
  }
`;

export const Styles = {
  ThemeBtn,
};
