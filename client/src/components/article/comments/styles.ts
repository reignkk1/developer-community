import styled from "@emotion/styled";

export const Container = styled.div`
  margin-top: 20px;
`;
export const CommentsBox = styled.ul``;
export const CommentsItem = styled.li`
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  padding-bottom: 40px;
  margin-bottom: 40px;
`;
export const User = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  a {
    display: block;
    color: ${(props) => props.theme.textColor};
    &:hover {
      color: #0092fa;
    }
    margin-right: 10px;
  }
`;

export const UserInfo = styled.div``;
export const Nickname = styled.div`
  font-size: 15px;
  margin-bottom: 5px;
`;
export const Date = styled.div`
  font-size: 14px;
`;
export const Text = styled.div`
  line-height: 2;
  @media (max-width: 940px) {
    font-size: 14px;
  }
`;

export const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
`;

export const Btn = styled.button`
  background-color: #0092fa;
  cursor: pointer;
  border: none;
  color: white;
  padding: 7px 10px;
  border-radius: 5px;
  font-size: 13px;
  &:hover {
    background-color: #0580d7;
  }
`;
export const DeleteBtn = styled(Btn)`
  margin-right: 5px;
`;
export const ModifyBtn = styled(Btn)`
  &:disabled {
    opacity: 0.6;
    cursor: default;
    pointer-events: none;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 30px;
  padding: 5px 10px;
  font-size: 14px;
  outline: none;
  &:focus {
    border: 1px solid #0580d7;
  }
`;

export const Count = styled.div`
  margin-bottom: 50px;
`;

export const CancleBtn = styled(Btn)`
  margin-right: 5px;
`;
