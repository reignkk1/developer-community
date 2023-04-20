import styled from "@emotion/styled";

export const Container = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 10px;
  padding: 30px;
  margin-top: 100px;
`;

export const WriteBox = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 50%;
  position: relative;
  margin-bottom: 30px;
`;
export const AvartarCat = styled.img`
  width: 50px;
  height: 50px;
  padding: 5px;
  margin-bottom: 5px;
`;
export const TextArea = styled.textarea`
  border: 1px solid ${(props) => props.theme.borderColor}s;
  width: 100%;
  height: 70px;
  resize: none;
  border-radius: 7px;
  padding: 10px;
  outline: none;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgCommentWriteColor};
  font-size: 15px;
`;
export const P = styled.p`
  position: absolute;
  left: 65px;
  top: 15px;
  @media (max-width: 940px) {
    font-size: 14px;
  }
  a {
    color: #0092fa;
    text-decoration: underline;
    font-weight: bold;
  }
`;
export const WriteBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  span {
    color: red;
    font-size: 15px;
    margin-right: 10px;
    margin-bottom: 20px;
  }
`;
export const Btn = styled.button`
  background-color: #0092fa;
  cursor: pointer;
  border: none;
  color: white;
  padding: 10px 40px;
  border-radius: 5px;

  font-weight: bold;
  font-size: 14px;
  &:hover {
    background-color: #0580d7;
  }
  &:disabled {
    pointer-events: none;
    opacity: 0.6;
  }
`;
export const WriteBox2 = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
