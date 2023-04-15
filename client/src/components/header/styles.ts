import styled from "@emotion/styled";

export const HeaderContainer = styled.header<{ pathname: String }>`
  display: ${(props) =>
    props.pathname === "/signup" ||
    props.pathname === "/login" ||
    props.pathname === "/account/password-change" ||
    props.pathname === "/account/withdraw-confirm"
      ? "none"
      : "flex"};
  width: 100%;
  height: 70px;
  background-color: ${(props) => props.theme.bgColor};
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  position: fixed;
  top: 0;
  z-index: 99;
  padding: 15px 0px;
`;

export const HeaderBox = styled.div`
  width: 1300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    cursor: pointer;
  }
  @media (max-width: 1065px) {
    padding: 0px 25px;
  }
`;

export const Wrapper = styled.div<{ isOpend: boolean }>`
  display: ${(props) => (props.isOpend ? "block" : "none")};
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: grey;
  opacity: 0.4;
`;
