import { FieldErrors, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Styles } from "./styles";

interface ISearchKeyword {
  searchKeyword: string;
}

export default function SearchBar() {
  const { register, handleSubmit, setValue } = useForm<ISearchKeyword>();

  const navigate = useNavigate();

  const onValid = (data: ISearchKeyword) => {
    setValue("searchKeyword", "");
    navigate(`/search?keyword=${data.searchKeyword}`);
  };
  const oninvalid = (error: FieldErrors) =>
    alert(`${error.searchKeyword?.message}`);

  return (
    <Styles.Form onSubmit={handleSubmit(onValid, oninvalid)}>
      <Styles.SearchBar
        type="text"
        {...register("searchKeyword", {
          required: "검색어를 입력해주세요.",
        })}
      />
      <button>검색</button>
    </Styles.Form>
  );
}
