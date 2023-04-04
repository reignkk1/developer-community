import styled from "@emotion/styled";

const HeaderContainer = styled.header<{ pathname: String }>`
  display: ${(props) =>
    props.pathname === "/signup" ||
    props.pathname === "/login" ||
    props.pathname === "/account/password-change" ||
    props.pathname === "/account/withdraw-confirm"
      ? "none"
      : "flex"};
  width: 100%;
  background-color: ${(props) => props.theme.bgColor};
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  position: fixed;
  top: 0;
  z-index: 99;
  padding: 15px 0px;
`;

const HeaderBox = styled.div`
  width: 1300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    cursor: pointer;
  }
`;

export const Styles = {
  HeaderContainer,
  HeaderBox,
};
