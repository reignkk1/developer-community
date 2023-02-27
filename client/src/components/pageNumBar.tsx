/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Container = css`
  margin-top: 100px;
`;

const PageBar = css`
  text-align: center;
`;

interface IDataLength {
  dataLength?: number;
  page: string;
}

export default function PageNumberBar({ dataLength, page }: IDataLength) {
  const buttonCount = Math.ceil(dataLength! / 10);
  const navigate = useNavigate();
  const onClick = (pageNumber: string) => {
    axios
      .get(`/${page}?page=${pageNumber}`)
      .then(() => navigate(`/${page}?page=${pageNumber}`));
  };
  return (
    <div css={Container}>
      <div css={PageBar}>
        {Array(buttonCount)
          .fill("")
          .map((item, index) => (
            <button onClick={() => onClick(index + 1 + "")}>{index + 1}</button>
          ))}
      </div>
    </div>
  );
}
