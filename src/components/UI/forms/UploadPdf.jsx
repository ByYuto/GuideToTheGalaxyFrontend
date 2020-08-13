import React from 'react';
import styled from 'styled-components';
import { PDFIcon } from '../../../assets/icons/svg-icons';

const PDFUploaderLayout = styled.div`
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
export default function UploadPdf() {
  return (
    <PDFUploaderLayout>
      <input type="file" />
      <button>
        + ADD PDF <PDFIcon />
      </button>
    </PDFUploaderLayout>
  );
}
