import styled from "@emotion/styled";

export const Title = styled.div`
  background-color: ${(props) => props.theme.bgTitleColor};
  border-radius: 10px;
  display: flex;

  justify-content: space-between;
  align-items: center;
  padding: 0px 25px;
  margin-bottom: 100px;
  height: 80px;
`;

export const TitleName = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 6px;
`;
export const Info = styled.div``;
export const Span = styled.span`
  font-size: 14px;
`;
