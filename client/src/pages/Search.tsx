/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { css } from "@emotion/react";

const main = css`
  width: 1000px;
  height: 100vh;
  margin: 0 auto;
`;

export default function Search() {
  const { keyword: keyword } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/search/${keyword}`)
      .then((response) => console.log(response));
  }, [keyword]);

  return (
    <main css={main}>
      <div>검색어 : {keyword}</div>
    </main>
  );
}
