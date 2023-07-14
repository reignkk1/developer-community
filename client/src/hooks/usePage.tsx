import { useNavigate } from "react-router-dom";
import { useGetAxios } from "./api/http";
import { IUserData } from "../types";
import { category } from "../atom";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";

export default function usePage(
  page: "notice" | "question" | "life" | "quote" | "search"
) {
  const navigate = useNavigate();
  const { data: loginUser } = useGetAxios<IUserData>("/user/login-info");
  const setPage = useSetRecoilState(category);

  const onClick = () => {
    loginUser ? navigate("write") : navigate("/login");
  };

  useEffect(() => {
    setPage(page);
  }, [setPage, page]);

  return { loginUser, onClick };
}
