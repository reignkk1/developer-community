import styled from "@emotion/styled";

export const Container = styled.div`
  img {
    position: relative;
  }
  @media (max-width: 1065px) {
    img {
      display: none;
    }
  }
`;

export const AvartarMenuBox = styled.div`
  width: 220px;
  height: 180px;
  border: 1px solid ${(props) => props.theme.borderColor};
  position: absolute;
  right: 50px;
  top: 70px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.bgColor};
`;

export const AvartarMenu = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 130px;
  padding: 10px 40px;
`;

export const UserActivity = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    color: #0092fa;
  }
`;

export const LogoutBtn = styled.div`
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
