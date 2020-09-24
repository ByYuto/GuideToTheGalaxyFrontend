import React from 'react';
import PdfMountedImage from '../../../assets/icons/pdf-large.svg';
import FlexContainer from '../FlexContainer';
import { PDFUploaderLayout } from './styled-components';

export default function DownloadPdf({ fileName, pdfUrl }) {
  return (
    <PDFUploaderLayout>
      <FlexContainer className="pdf-selected-container" align="center">
        <figure>
          <img src={PdfMountedImage} />
        </figure>
        <FlexContainer column>
          <h4 alt={fileName} title={fileName}>
            {fileName}
          </h4>
          <a className="delete-pdf" href={pdfUrl}>
            <span>View</span>
          </a>
        </FlexContainer>
      </FlexContainer>
    </PDFUploaderLayout>
  );
}
