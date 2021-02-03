import React, { useEffect, useState, useRef } from 'react';
import { PDFUploaderLayout, TextValidation } from './styledComponents';
import { PDFIcon } from '../../../assets/icons/svg-icons';
import PdfMountedImage from '../../../assets/icons/pdf-large.svg';
import FlexContainer from '../FlexContainer';
import { uploadFile } from '../../../http/createArticleService';
import { insertPdf } from '../../../redux/reducers/newArticleState';
import { useDispatch } from 'react-redux';

export default function UploadPdf() {
  const inputPdf = useRef(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const handleCleanInputFile = () => {
    dispatch(insertPdf(null));
    setFileName('');
  };
  const handleOnChange = async (e) => {
    e.preventDefault();
    setError('');
    setFileName(e.target.files[0].name);
    const dataSrc = e.target.files[0];
    console.log('subiendo archivo...');
    let fileData;

    try {
      fileData = await uploadFile(dataSrc);
      await dispatch(insertPdf(fileData.fileId));
    } catch (e) {
      console.log('paso por aqui', e.response.data);
      setError(e.response.data?.message || e.message);
      setFileName('');
      await dispatch(insertPdf(null));
    }
  };

  const handleLoadPdf = () => {
    if (inputPdf && inputPdf.current) inputPdf.current.click();
  };

  useEffect(() => {
    if (fileName === '' && inputPdf && inputPdf.current) {
      inputPdf.current.value = '';
    }
  }, [fileName]);

  return (
    <PDFUploaderLayout>
      {fileName === '' ? (
        <>
          <input type="file" ref={inputPdf} onChange={handleOnChange} accept="application/pdf" />
          <button onClick={handleLoadPdf}>
            + ADD PDF <PDFIcon />
          </button>
        </>
      ) : (
        <FlexContainer className="pdf-selected-container" align="center">
          <figure>
            <img src={PdfMountedImage} alt={fileName} />
          </figure>
          <FlexContainer column>
            <h4>{fileName}</h4>
            <button className="delete-pdf" onClick={handleCleanInputFile}>
              <span>Delete</span>
            </button>
          </FlexContainer>
        </FlexContainer>
      )}
      {error ? <TextValidation>ERROR: {error}</TextValidation> : null}
    </PDFUploaderLayout>
  );
}
