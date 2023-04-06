import styled from "@emotion/styled";

export const Container = styled.div`
  height: 500px;
`;
export const ListBox = styled.ul`
  padding: 5px;
`;
export const ListItem = styled.li`
  padding: 15px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;
export const ListTitle = styled.div`
  margin-bottom: 5px;
  font-weight: bold;
  opacity: 0.9;

  a {
    display: block;
    height: 20px;
    color: ${(props) => props.theme.textColor};
    &:hover {
      color: #0092fa;
    }
    display: block;
    width: 410px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
export const ListDate = styled.div`
  opacity: 0.9;
  font-size: 13px;
`;

export const NicknameBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const Nickname = styled.div`
  font-size: 14px;
  margin-left: 5px;
  margin-right: 7px;
  color: ${(props) => props.theme.textColor};

  &:hover {
    color: #0092fa;
  }
`;
