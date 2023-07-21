import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const Title = styled.div`
  background-color: ${props => props.theme.bgTitleColor};
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 25px;
  height: 70px;
`;

const TitleName = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: ${props => props.theme.textColor};

  &:hover {
    color: #0092fa;
  }
`;

// =============================================================================

interface ICategory {
  to: string;
  children: React.ReactNode;
}

// =============================================================================

export default function Category({ to, children }: ICategory) {
  return (
    <Link to={to}>
      <Title>
        <TitleName>{children}</TitleName>
      </Title>
    </Link>
  );
}
