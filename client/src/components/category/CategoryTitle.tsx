import styled from '@emotion/styled';

const Container = styled.div`
  background-color: ${props => props.theme.bgTitleColor};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 25px;
  margin-bottom: 100px;
  height: 80px;
  span {
    font-size: 14px;
  }
`;

const TitleName = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 6px;
`;

// =============================================================================

interface IPagesTitle {
  name: string;
  explain: string;
}

// =============================================================================

export default function Title({ name, explain }: IPagesTitle) {
  return (
    <Container>
      <div>
        <TitleName>{name}</TitleName>
        <span>{explain}</span>
      </div>
    </Container>
  );
}
