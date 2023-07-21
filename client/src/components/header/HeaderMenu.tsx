import { useTheme } from '@emotion/react';
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

const Container = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1065px) {
    display: none;
  }
`;
const MenuItem = styled.li`
  margin-right: 35px;
  font-weight: bold;
`;

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
                location.pathname === item.path ? '#0092fa' : theme.textColor
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
