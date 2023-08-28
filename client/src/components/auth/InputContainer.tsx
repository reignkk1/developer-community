import styled from "@emotion/styled";
import { UseFormRegister } from "react-hook-form";

// =============================================================================

const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  font-size: 18px;
  border-radius: 5px;
  color: ${(props) => props.theme.textColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.inputColor};
  &:focus {
    border: 1px solid #0580d7;
  }
  outline: none;
  margin-bottom: 5px;
`;
const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;
// =============================================================================

interface InputContainerProps {
  register: UseFormRegister<any>;
  label: string;
  placeholder: string;
  type: string;
  name: string;
  required: boolean;
  minLength?: number;
  maxlength?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  defaultValue?: string;
}

// =============================================================================

export default function InputContainer({
  register,
  label,
  placeholder,
  type,
  name,
  required,
  minLength,
  maxlength,
  onChange,
  defaultValue,
}: InputContainerProps) {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <InputBox>
        <Input
          id={name}
          placeholder={placeholder}
          type={type}
          {...register(name, {
            required: { value: required, message: `${label}를 입력해주세요!` },
            minLength: {
              value: minLength || 1,
              message: `${minLength}자 이상 입력해주세요.`,
            },
            maxLength: {
              value: maxlength || 100,
              message: `${maxlength}자 이하로 입력해주세요.`,
            },
          })}
          onChange={onChange}
          defaultValue={defaultValue}
        />
      </InputBox>
    </>
  );
}
