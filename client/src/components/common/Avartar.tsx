import styled from '@emotion/styled';
import { RefObject } from 'react';

const Img = styled.img`
  border-radius: 50%;
  width: ${props => props.width};
  height: ${props => props.height};
`;

interface IAvartar {
  width: string;
  heigth: string;
  src?: string;
  onClick?(): void;
  refAvartar?: RefObject<HTMLImageElement>;
}

export default function Avartar({
  width,
  heigth,
  src,
  onClick,
  refAvartar,
}: IAvartar) {
  return (
    <Img
      src={
        src ||
        'https://graph.facebook.com/555897032021233/picture?width=100&height=100'
      }
      alt="프로필"
      width={width}
      height={heigth}
      onClick={onClick}
      ref={refAvartar}
    />
  );
}
