import { Link } from "react-router-dom";
import { Title, TitleName } from "./styles";

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
