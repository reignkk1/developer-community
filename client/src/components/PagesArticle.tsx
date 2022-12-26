import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IData, IPage } from "../interface";

const ListBox = styled.ul``;
const ListItem = styled.li`
  padding: 30px 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`;
const ListTitle = styled.div`
  font-weight: bold;
  opacity: 0.9;
  margin-bottom: 10px;
  &:hover {
    color: #0092fa;
  }
`;
const ListDate = styled.div`
  opacity: 0.9;
`;

export default function PagesArticle({ page }: IPage) {
  const [data, setData] = useState<IData[]>();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/${page}`)
      .then((response) => setData(response.data));
  }, []);

  return (
    <ListBox>
      {data?.map((item) => (
        <ListItem>
          <Link to={`/${page}/${item.id}`}>
            <ListTitle>{item.title}</ListTitle>
          </Link>

          <ListDate>{item.date}</ListDate>
        </ListItem>
      ))}
    </ListBox>
  );
}
