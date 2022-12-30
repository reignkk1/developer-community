import styled from "@emotion/styled";

const Btn = styled.button`
  background-color: #0092fa;
  cursor: pointer;
  border: none;
  color: white;
  padding: 10px 10px 10px 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 14px;
  &:hover {
    background-color: #0580d7;
  }
`;

interface IBtn {
  text: string;
  onClick?: () => void;
}

export default function Button({ text, onClick }: IBtn) {
  return <Btn onClick={onClick}>{text}</Btn>;
}
