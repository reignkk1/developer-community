import styled from "@emotion/styled";

export const UserAvartarContainer = styled.div`
  img {
    margin-top: 50px;
  }
  @media (max-width: 1065px) {
    text-align: center;
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
  top: 150px;
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
  cursor: pointer;
  @media (max-width: 1065px) {
    left: 50%;
    transform: translate(-50%, -50%);
    top: 406px;
  }
`;

export const InputAvartar = styled.input`
  display: none;
`;

export const FormAvartar = styled.form``;
