import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';

interface PaginationProps {
  total: number;
  pageItems: number;
}

export default function Pagination({ total, pageItems }: PaginationProps) {
  const pageTotal = Math.ceil(total / pageItems);
  const numbers = Array.from({ length: pageTotal }, (_, pageNumber) =>
    String(pageNumber + 1)
  );

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const navigate = useNavigate();
  const pageNumbers = numbers.slice(
    0 + 10 * (Math.ceil(Number(page) / 10) - 1),
    10 * Math.ceil(Number(page) / 10)
  );

  const activePrevButton = !pageNumbers.includes(numbers[0]);
  const activeNextButton = !pageNumbers.includes(numbers[numbers.length - 1]);

  const getLinkPageButton = (pageNumber: string) => {
    return `?page=${pageNumber}`;
  };

  const handleClickNext = () => {
    navigate(getLinkPageButton(String(Number(pageNumbers?.slice(-1)) + 1)));
  };

  const handleClickPrev = () => {
    navigate(getLinkPageButton(String(Number(pageNumbers?.slice(0, 1)) - 1)));
  };

  const pageButtons = pageNumbers?.map(pageNumber => {
    const active = pageNumber === page;
    return (
      <ListItem key={pageNumber} active={active}>
        <Link to={getLinkPageButton(pageNumber)}>{pageNumber}</Link>
      </ListItem>
    );
  });

  const prevButton = activePrevButton && (
    <Button onClick={handleClickPrev}>{`< 이전`}</Button>
  );

  const nextButton = activeNextButton && (
    <Button onClick={handleClickNext}>{`다음 >`}</Button>
  );

  return (
    <Container>
      {prevButton}
      <List>{pageButtons}</List>
      {nextButton}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

const List = styled.ul`
  display: flex;
  margin: 0px 20px;
`;

const ListItem = styled.li<{ active: boolean }>`
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    border-radius: 5px;
    width: 30px;
    height: 30px;
    margin-right: 5px;
    background-color: ${props => (props.active ? '#eaedf4' : 'none')};
    border: ${props => (props.active ? '1px solid black' : 'none')};
    cursor: pointer;
    &:hover {
      background-color: #eaedf4;
    }
    opacity: 0.7;
  }
`;

const Button = styled.button`
  border: none;
  background-color: white;
  border-radius: 5px;
  &:hover {
    background-color: #eaedf4;
  }
  cursor: pointer;
`;
