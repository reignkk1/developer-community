import styled from "@emotion/styled";

const Container = styled.div`
  margin-top: 20px;
`;
const Box = styled.ul``;
const Item = styled.li`
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  padding-bottom: 20px;
  margin-bottom: 40px;
`;
const WriteBtn = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  color: grey;
`;

const User = styled.div`
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

const UserInfo = styled.div``;
const Nickname = styled.div`
  font-size: 15px;
  margin-bottom: 5px;
`;
const Date = styled.div`
  font-size: 14px;
`;
const Text = styled.div`
  line-height: 2;
  @media (max-width: 940px) {
    font-size: 14px;
  }
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const Btn = styled.button`
  background-color: #0092fa;
  cursor: pointer;
  border: none;
  color: white;
  padding: 6px 10px;
  border-radius: 5px;
  font-size: 13px;
  &:hover {
    background-color: #0580d7;
  }
`;
const DeleteBtn = styled(Btn)`
  margin-right: 5px;
`;
const ModifyBtn = styled(Btn)`
  &:disabled {
    opacity: 0.6;
    cursor: default;
    pointer-events: none;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  padding: 5px 10px;
  font-size: 14px;
  outline: none;
  &:focus {
    border: 1px solid #0580d7;
  }
`;

const Count = styled.div`
  margin-bottom: 50px;
`;

const CancleBtn = styled(Btn)`
  margin-right: 5px;
`;

export const Comment = {
  Container,
  Box,
  Item,
  WriteBtn,
  User,
  UserInfo,
  Nickname,
  Date,
  Text,
  BtnBox,
  Btn,
  DeleteBtn,
  ModifyBtn,
  Input,
  Count,
  CancleBtn,
};
