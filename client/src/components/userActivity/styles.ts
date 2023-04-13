import styled from "@emotion/styled";

export const UserInfoBox = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  height: 200px;
  overflow: hidden;
  border-radius: 8px;
`;
export const UserInfo = styled.div`
  padding: 10px 30px 10px 30px;
  height: 75%;
  display: flex;
  align-items: center;
`;

export const UserNickname = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-left: 20px;
`;
export const UserMenuBox = styled.ul`
  display: flex;
  align-items: center;
  height: 25%;
  border-top: 1px solid ${(props) => props.theme.borderColor};
  padding: 20px 30px;
  background-color: ${(props) => props.theme.bgUserInfoMenuColor};
`;

export const UserMenu = styled.li<{ urlMatch: boolean }>`
  margin-right: 50px;
  font-size: 15px;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 45px;
    color: ${(props) => props.theme.textColor};

    &:hover {
      color: #0092fa;
    }
    border-bottom: ${(props) => (props.urlMatch ? "3px solid #0092fa;" : null)};
    color: ${(props) => (props.urlMatch ? "#0092fa;" : null)};
  }
`;
