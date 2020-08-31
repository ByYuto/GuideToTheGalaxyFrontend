import styled from 'styled-components';

export const TextValidation = styled.div`
  color: #f5374e;
  font-size: 12px;
`;

export const PDFUploaderLayout = styled.div`
  & .pdf-selected-container {
    box-shadow: 0px 0px 12px rgba(97, 124, 255, 0.1);
    border-radius: 8px;
    background-color: transparent;
    padding: 5px 10px;
    width: 35%;
    @media (max-width: 600px) {
      width: auto;
    }
  }
  & figure {
    margin-right: 10px;
    margin-left: 0;
  }
  & h4 {
    margin: 0;
  }
  & .delete-pdf {
    border: none;
    padding: 0;
    margin-top: 10px;
    color: #6670f0;
  }
  & input[type='file'] {
    position: absolute;
    z-index: -999;
    opacity: 0;
  }
  & button {
    box-shadow: 0px 0px 12px rgba(97, 124, 255, 0.1);
    border-radius: 8px;
    background-color: transparent;
    padding: 10px 20px;
    color: #9695b7;
    display: flex;
    align-items: center;
    border: none !important;
    outline: 0;
    font-weight: bold;
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
    cursor: pointer;

    &:focus {
      outline: 0;
      border: none;
    }

    & svg {
      margin-left: 15px;
    }
  }
`;
