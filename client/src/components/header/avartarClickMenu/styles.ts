import styled from "@emotion/styled";

const AvartarMenuBox = styled.div`
  width: 220px;
  height: 180px;
  border: 1px solid ${(props) => props.theme.borderColor};
  position: absolute;
  right: 120px;
  top: 60px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.bgColor};
`;

const AvartarMenu = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 130px;
  padding: 10px 40px;
`;

const UserActivity = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    color: #0092fa;
  }
`;

const LogoutBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  cursor: pointer;
  border-top: 1px solid ${(props) => props.theme.borderColor};
  padding: 25px 40px;
  font-weight: bold;
  &:hover {
    color: #0092fa;
  }
`;

export const Styles = {
  AvartarMenuBox,
  AvartarMenu,
  UserActivity,
  LogoutBtn,
};
