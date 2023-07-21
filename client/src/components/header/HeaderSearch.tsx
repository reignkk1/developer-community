import { FieldErrors, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const Form = styled.form`
  display: flex;
  align-items: center;
  button {
    color: white;
    font-weight: bold;
    background-color: #0092fa;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: #0580d7;
    }
  }
  @media (max-width: 1065px) {
    display: none;
  }
`;
const SearchInput = styled.input`
  background-color: ${props => props.theme.inputColor};
  border: 1px solid ${props => props.theme.borderColor};
  outline: none;
  color: ${props => props.theme.textColor};
  padding: 5px 15px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
`;

interface ISearchKeyword {
  searchKeyword: string;
}

export default function SearchBar() {
  const { register, handleSubmit, setValue } = useForm<ISearchKeyword>();

  const navigate = useNavigate();

  const onValid = (data: ISearchKeyword) => {
    setValue('searchKeyword', '');
    navigate(`/search?keyword=${data.searchKeyword}`);
  };
  const oninvalid = (error: FieldErrors) =>
    alert(`${error.searchKeyword?.message}`);

  return (
    <Form onSubmit={handleSubmit(onValid, oninvalid)}>
      <SearchInput
        type="text"
        {...register('searchKeyword', {
          required: '검색어를 입력해주세요.',
        })}
      />
      <button>검색</button>
    </Form>
  );
}
