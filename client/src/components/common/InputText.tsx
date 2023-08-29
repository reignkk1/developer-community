import styled from '@emotion/styled';

const Label = styled.label`
  display: block;
  text-align: start;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  height: 35px;
  margin-bottom: 50px;
  padding: 10px 15px;
  outline: none;
  border: 2px solid rgba(0, 0, 0, 0.3);
  background-color: ${props => props.theme.inputColor};
  color: ${props => props.theme.textColor};
  &:focus {
    border: 2px solid #0092fa;
  }
  border-radius: 5px;
`;

interface InputTextProps {
  type?: string;
  placeholder: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  required: boolean;
  value?: string;
  label: string;
}

export default function InputText({
  type = 'text',
  placeholder,
  onChange,
  required,
  value = '',
  label,
}: InputTextProps) {
  return (
    <>
      <Label htmlFor={label}>{label}</Label>
      <Input
        id={label}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        value={value}
      />
    </>
  );
}
