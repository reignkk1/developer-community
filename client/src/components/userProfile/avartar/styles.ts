import styled from "@emotion/styled";

export const UserAvartarContainer = styled.div`
  position: relative;
  img {
    margin-top: 50px;
  }
`;

export const UserAvartarModal = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  width: 155px;
  height: 155px;
  border-radius: 50%;
  position: absolute;
  top: 50px;
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
  cursor: pointer;
`;

export const InputAvartar = styled.input`
  display: none;
`;

export const FormAvartar = styled.form``;
