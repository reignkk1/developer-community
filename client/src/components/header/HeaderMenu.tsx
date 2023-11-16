import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import useActiveSection from '../../hooks/useActiveSection';
import sectionPost from '../../sectionPost.json';

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
  const section = useActiveSection();
  return (
    <Container>
      {sectionPost.routes.map((item, index) => (
        <MenuItem key={index}>
          <Link
            to={`/${item.section}`}
            style={{
              color: `${
                section === item.section ? '#0092fa' : theme.textColor
              }`,
            }}
          >
            {item.title}
          </Link>
        </MenuItem>
      ))}
    </Container>
  );
}
