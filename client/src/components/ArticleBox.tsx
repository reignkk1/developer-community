import styled from "@emotion/styled";

const Container = styled.div``;
const Title = styled.div`
  background-color: #e8eef1;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Img = styled.img`
  width: 40%;
  height: 80px;
`;
const TitleName = styled.div``;

interface IArticle {
  type: string;
  name: string;
}

export default function ArticleBox({ type, name }: IArticle) {
  return (
    <Container>
      <Title>
        <TitleName>{name}</TitleName>
        <Img src={type} />
      </Title>
    </Container>
  );
}
