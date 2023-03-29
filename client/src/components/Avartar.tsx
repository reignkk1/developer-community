import styled from "@emotion/styled";

const Img = styled.img`
  border-radius: 50%;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

interface IAvartar {
  width: string;
  heigth: string;
  src?: string;
  onClick?(): void;
}

export default function Avartar({ width, heigth, src, onClick }: IAvartar) {
  return (
    <Img
      src={
        src === ""
          ? "https://graph.facebook.com/555897032021233/picture?width=100&height=100"
          : src
      }
      alt="프로필"
      width={width}
      height={heigth}
      onClick={onClick}
    />
  );
}
