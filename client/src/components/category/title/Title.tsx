import { Info, Span, Title, TitleName } from "./styles";

// =============================================================================

interface IPagesTitle {
  name: string;
  explain: string;
}

// =============================================================================

export default function PagesTitle({ name, explain }: IPagesTitle) {
  return (
    <Title>
      <Info>
        <TitleName>{name}</TitleName>
        <Span>{explain}</Span>
      </Info>
    </Title>
  );
}
