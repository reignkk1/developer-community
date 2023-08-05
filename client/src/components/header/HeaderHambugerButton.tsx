import { useSetRecoilState } from 'recoil';
import { isOpendDrawerMenu } from '../../store/atom';
import styled from '@emotion/styled';

const Container = styled.div`
  display: none;

  @media (max-width: 1065px) {
    display: block;
    padding: 5px;
    border-radius: 6px;
    svg {
      width: 30px;
      height: 30px;
      color: #0092fa;
    }
    cursor: pointer;
    &:hover {
      background-color: #e7e7e9;
    }
  }
`;

export default function HambugerButton({ ...props }) {
  const setDrawerMenuOpen = useSetRecoilState(isOpendDrawerMenu);
  return (
    <Container
      {...props}
      role="button"
      onClick={() => setDrawerMenuOpen(current => !current)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
      </svg>
    </Container>
  );
}
