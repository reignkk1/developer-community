import styled from "@emotion/styled";

export const ListBox = styled.ul``;
export const ListItem = styled.li`
  padding: 20px 0px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;
export const ListTitle = styled.div`
  font-weight: bold;
  opacity: 0.9;
  margin-bottom: 10px;
  color: ${(props) => props.theme.textColor};
  &:hover {
    color: #0092fa;
  }
`;
export const ListDate = styled.div`
  opacity: 0.9;
`;

export const NicknameBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  a {
    display: block;
    color: ${(props) => props.theme.textColor};
    &:hover {
      color: #0092fa;
    }
    margin-right: 5px;
  }
`;

export const Nickname = styled.div`
  font-size: 14px;
  margin-right: 7px;
`;
