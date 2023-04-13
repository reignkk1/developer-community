import styled from "@emotion/styled";

export const Menu = styled.div`
  width: 25%;
  height: 100%;
  border-right: 1px solid ${(props) => props.theme.borderColor};
`;
export const MenuTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 50px;
`;
export const MenuList = styled.ul`
  width: 270px;
`;
export const MenuItem = styled.li<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  margin-bottom: 5px;
  border-radius: 5px;
  color: ${(props) => props.theme.textColor};
  &:hover {
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.bgTitleColor};
  }
  svg {
    width: 25px;
    height: 25px;
    margin-right: 8px;
  }
`;

export const MenuItem1 = styled(MenuItem)<{ active: boolean }>`
  background-color: ${(props) =>
    props.active === true ? props.theme.bgTitleColor : null};
  color: ${(props) =>
    props.active === true
      ? props.theme.textColor
      : props.theme.borderHoverColor};
`;

export const MenuItem2 = styled(MenuItem)<{ active: boolean }>`
  background-color: ${(props) =>
    props.active === true ? props.theme.bgTitleColor : null};
  color: ${(props) =>
    props.active === true
      ? props.theme.textColor
      : props.theme.borderHoverColor};
`;
