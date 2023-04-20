import styled from "@emotion/styled";

export const Container = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? "block" : "none")};
  width: 250px;
  height: 100%;
  background-color: ${(props) => props.theme.bgColor};
  position: fixed;
  top: 0;
  right: 0;
  z-index: 99;
  @media (min-width: 1065px) {
    display: none;
  }
  button {
    display: block;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CloseButton = styled.button`
  margin: 10px 10px 0px 0px;
  background-color: ${(props) => props.theme.bgColor};
  border: none;
  color: grey;
  font-size: 20px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 10px;
  margin-bottom: 30px;
  &:hover {
    color: var(--blue);
    background-color: #e7e7e9;
  }
`;

export const Menu = styled.ul`
  margin: 0px 5px;
`;
export const MenuList = styled.li`
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 15px 10px;
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
  &:hover {
    color: var(--blue);
    background-color: ${(props) => props.theme.bgUserInfoMenuColor};
  }
`;

export const Theme = styled.div`
  display: flex;
  justify-content: center;
`;

export const SignBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  font-size: 14px;
  a {
    color: ${(props) => props.theme.textColor};
  }
  a:hover {
    color: var(--blue);
  }
`;

export const LogOut = styled.div`
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  &:hover {
    color: var(--blue);
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  img {
    cursor: default;
    margin-right: 10px;
  }
`;
