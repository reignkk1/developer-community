import styled from "@emotion/styled";

export const ButtonBox = styled.div`
  @media (max-width: 1065px) {
    display: none;
  }
`;
export const LoginBtn = styled.button`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  border: none;
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
  font-weight: bold;
  font-size: 12px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
export const JoinBtn = styled.button`
  background-color: #0092fa;
  cursor: pointer;
  border: none;
  color: white;
  padding: 10px 15px;
  border-radius: 20px;
  margin-left: 10px;
  font-weight: bold;
  font-size: 12px;
  &:hover {
    background-color: #0580d7;
  }
`;
