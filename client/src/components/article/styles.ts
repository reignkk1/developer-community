import styled from "@emotion/styled";

export const ArticleContainer = styled.div`
  padding: 40px 0px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 30px;
`;

export const ArticleTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 80px;
`;
export const ArticleText = styled.div`
  font-size: 16px;
  line-height: 1.7;
`;

export const ButtonBox = styled.div`
  button {
    margin-right: 10px;
  }
`;
export const UserBox = styled.div`
  display: flex;
  margin-bottom: 30px;
  align-items: center;
  a {
    margin-right: 10px;
  }
`;

export const NicknameBox = styled.div`
  a {
    display: block;
    color: ${(props) => props.theme.textColor};
    &:hover {
      color: #0092fa;
    }
  }
`;
export const Nickname = styled.div`
  margin-bottom: 5px;
`;
export const Date = styled.div`
  font-size: 14px;
`;
