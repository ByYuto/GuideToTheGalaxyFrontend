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

    & p {
      margin: 0;
    }
    & .form-title {
      margin-top: 0;
      margin-bottom: 10px;
    }

    & .form-inside {
      padding: 0;
      margin: 0;
      min-height: 200px;
    }
  }
   
`;
