import React from 'react';
import PdfMountedImage from '../../../assets/icons/pdf-large.svg';
import FlexContainer from '../FlexContainer';
import { PDFUploaderLayout } from './styled-components';

export default function DownloadPdf({ fileName, originalFilename, pdfUrl }) {
  const displayName = originalFilename || fileName || '';
  return (
    <PDFUploaderLayout>
      <FlexContainer className="pdf-selected-container" align="center">
        <figure>
          <img src={PdfMountedImage} alt={displayName} />
        </figure>
        <FlexContainer column>
          <h4 alt={displayName} title={displayName}>
            {displayName}
          </h4>
          <a className="delete-pdf" href={pdfUrl} target="_blank" rel="noopener noreferrer">
            <span>View</span>
          </a>
        </FlexContainer>
      </FlexContainer>
    </PDFUploaderLayout>
  );
}
