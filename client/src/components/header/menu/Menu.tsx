import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import { Styles } from "./styles";

interface IMenu {
  menu: { name: string; path: string }[];
}

export default function Menu({ menu }: IMenu) {
  const theme = useTheme();

  return (
    <Styles.Container>
      {menu.map((item, index) => (
        <Styles.MenuItem key={index}>
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
        </Styles.MenuItem>
      ))}
    </Styles.Container>
  );
}
