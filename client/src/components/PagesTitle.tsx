import styled from "@emotion/styled";
import { IPagesTitle } from "../interface";

const Title = styled.div`
  background-color: #e8eef1;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 25px;
  margin-bottom: 100px;
  height: 80px;
`;
const Img = styled.img`
  width: 40%;
  height: 80px;
`;
const TitleName = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 6px;
`;

const Info = styled.div``;
const Span = styled.span`
  font-size: 14px;
`;

export default function PagesTitle({ name, ImgeSrc, explain }: IPagesTitle) {
  return (
    <Title>
      <Info>
        <TitleName>{name}</TitleName>
        <Span>{explain}</Span>
      </Info>

      <Img src={ImgeSrc} />
    </Title>
  );
}
