import styled from 'styled-components';

export const LoginLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & .form-container,
  form {
    padding-top: 0 !important;
    width: 90%;

    & p.form-title {
      margin-top: 0;
    }
  }
`;
