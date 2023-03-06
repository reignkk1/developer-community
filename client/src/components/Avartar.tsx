import styled from "@emotion/styled";

const Img = styled.img`
  border-radius: 50%;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

interface IAvartar {
  width: string;
  heigth: string;
}

export default function Avartar({ width, heigth }: IAvartar) {
  return (
    <Img
      src="https://graph.facebook.com/555897032021233/picture?width=100&height=100"
      alt="프로필"
      width={width}
      height={heigth}
    />
  );
}
