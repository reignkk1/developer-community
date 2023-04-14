import { useTheme } from "@emotion/react";
import { Link, useLocation } from "react-router-dom";
import { Container, MenuItem } from "./styles";

interface IMenu {
  menu: { name: string; path: string }[];
}

export default function Menu({ menu }: IMenu) {
  const theme = useTheme();
  const location = useLocation();
  return (
    <Container>
      {menu.map((item, index) => (
        <MenuItem key={index}>
          <Link
            to={item.path}
            style={{
              color: `${
                location.pathname === item.path ? "#0092fa" : theme.textColor
              }`,
            }}
          >
            {item.name}
          </Link>
        </MenuItem>
      ))}
    </Container>
  );
}
