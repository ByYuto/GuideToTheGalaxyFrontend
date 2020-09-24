import styled from 'styled-components';

export const PDFUploaderLayout = styled.div`
  width: 258px;
  & .pdf-selected-container {
    box-shadow: 0px 0px 12px rgba(97, 124, 255, 0.1);
    border-radius: 8px;
    background-color: transparent;
    padding: 5px 10px;
    width: 100%;
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
    overflow: hidden;
    width: 158px;
  }
  & .delete-pdf {
    border: none;
    padding: 0;
    margin-top: 10px;
    color: #6670f0 !important;
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    align-items: center;
  }
`;
