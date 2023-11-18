import { useTheme } from '@emotion/react';
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import sectionData from '../../sectionData.json';

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

export default function HeaderMenu() {
  const theme = useTheme();
  const { pathname } = useLocation();
  const { data: section } = sectionData;

  return (
    <Container>
      {section.map(({ path, title }, index) => (
        <MenuItem key={index}>
          <Link
            to={path}
            style={{
              color: `${
                pathname.startsWith(path) ? '#0092fa' : theme.textColor
              }`,
            }}
          >
            {title}
          </Link>
        </MenuItem>
      ))}
    </Container>
  );
}
