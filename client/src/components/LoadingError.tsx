import styled from "@emotion/styled";

const Loading = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 60px;
    height: 60px;
  }
`;
const Error = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function LoadingBox() {
  return (
    <Loading>
      <img src="/img/loading.gif" />
    </Loading>
  );
}

export function ErrorBox() {
  return <Error>404 Not Found</Error>;
}
