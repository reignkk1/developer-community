import styled from "@emotion/styled";
import MyPageMenu from "../components/MyPageMenu";

const Main = styled.main`
  border: 1px solid red;
  width: 1280px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
`;

export default function Account() {
  return (
    <Main>
      <MyPageMenu />
    </Main>
  );
}
