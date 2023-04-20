import styled from "@emotion/styled";

// =============================================================================

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 50px;
`;

const Input = styled.input`
  width: 92%;
  height: 40px;
  outline: none;
  border: 2px solid #0092fa;
  font-size: 16px;
  padding: 0px 10px;
  font-weight: bold;
  background-color: ${(props) => props.theme.inputColor};
  color: ${(props) => props.theme.textColor};
`;

const Btn = styled.button`
  width: 8%;
  background-color: #0092fa;
  border: none;
  cursor: pointer;
  font-size: 16px;
  @media (max-width: 940px) {
    font-size: 14px;
    width: 10%;
  }
`;

// =============================================================================

interface IQuoteInput {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  inputData: string;
  btnText: string;
}
// =============================================================================

export default function QuoteInput({
  onChange,
  onClick,
  inputData,
  btnText,
}: IQuoteInput) {
  return (
    <InputContainer>
      <Input onChange={onChange} value={inputData} />
      <Btn onClick={onClick}>{btnText}</Btn>
    </InputContainer>
  );
}
