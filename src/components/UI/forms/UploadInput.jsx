import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import PlaceholderImg from '../../../assets/images/Rectangle.png';
import { StyledFieldTooltip } from '../../../views/CreateArticle/StyledComponents';
import { validate, fileRequired } from '../../../utils/validations';
import { useDispatch, useSelector } from 'react-redux';
import { validateField } from '../../../redux/reducers/newArticleState';
import { TextValidation } from './styledComponents';
import { CameraIcon } from '../../../assets/icons/svg-icons';
import { uploadImage } from '../../../http/createArticleService';
import { FlexboxGrid } from 'rsuite';
import Loader from '../Loader';

const UploadInputLayout = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 74%;
  cursor: pointer;
  ${(props) => props.isRequired && 'margin-top: 2em;'}
  & .upload-tooltip {
    left: 0;
    top: 100%;

    &:before {
      right: 50%;
      bottom: 95%;
      width: 0;
      height: 0;
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      border-bottom: 12px solid #6670f0;
    }
  }
  &:hover {
    button {
      color: #6670f0;
      opacity: 1;
      & svg path,
      svg rect {
        fill: #6670f0;
      }
    }
  }
  & button {
    border-radius: 50%;
    background-color: #151531;
    opacity: 0.7;
    border: none;
    text-transform: uppercase;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 3;
    outline: 0;
    color: white;
    width: 82px;
    height: 82px;
    font-size: 12px;
    cursor: pointer;
    position: absolute;
    &:hover {
      color: #6670f0;
      opacity: 1;
      & svg path,
      svg rect {
        fill: #6670f0;
      }
    }
    & svg {
      margin-bottom: 5px;
    }
  }

  & img {
    position: absolute;
    width: 100%;
    height: auto;
    z-index: 2;
  }

  & input {
    z-index: -1;
  }
`;

const LoaderContainer = styled.div`
  margin-top: 16px;
`;

export default function UploadInput({ contentType, onChange, readOnly, srcImg = PlaceholderImg }) {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const tooltip = contentType ? contentType['image']?.tooltip : 'Select an Image';
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { articleValidations } = useSelector((store) => store.newArticle);
  const [serverError, setServerError] = useState(null);
  const imageValidation = articleValidations.image;
  //handle image validations
  const handleImageValidation = async (value) => {
    const validationsUpdate = contentType['image'].required ? [fileRequired] : [];
    const isValidImage = validate(value, validationsUpdate);
    const fieldValidation = {};
    fieldValidation['image'] = isValidImage.length > 0 ? isValidImage[0] : { valid: true, errorType: '' };
    await dispatch(validateField(fieldValidation));
  };

  const handleImgSelect = () => {
    if (!readOnly) {
      //handleImageValidation(inputRef.current.files);
      return inputRef.current.click();
    } else {
      return;
    }
  };
  const handleFileChange = async (e) => {
    e.preventDefault();
    const files = e.target.files;
    const dataSrc = e.target.files[0];
    if (dataSrc) {
      setLoading(true);
      try{
        const imageData = await uploadImage(dataSrc);
        if (imageData.url) {
          const newArticle = {
            photo: imageData,
          };
          handleImageValidation(files);
          onChange(newArticle);
        } else {
          return;
        }
      }
      catch(e){
        setServerError(e?.response?.data?.message || e.message);
      }
      setLoading(false);
    } else {
      return;
    }
  };
  const imgToPlace = srcImg !== null && srcImg !== '' ? srcImg : PlaceholderImg;
  useEffect(() => {
    if (inputRef && inputRef.current) {
      handleImageValidation(inputRef.current.files);
    }
  }, [srcImg]);
  return !loading ? (
    <>
      <UploadInputLayout onClick={handleImgSelect} isRequired={contentType.image.required}>
        <img
          alt={'featured img'}
          src={imgToPlace}
          onFocus={() => setTooltipVisible(true)}
          onBlur={() => setTooltipVisible(false)}
        />
        <button onFocus={() => setTooltipVisible(true)} onBlur={() => setTooltipVisible(false)}>
          <CameraIcon />
          Upload
        </button>
        <input type="file" onChange={handleFileChange} ref={inputRef} />
        {tooltipVisible && tooltip && <StyledFieldTooltip className="upload-tooltip">{tooltip}</StyledFieldTooltip>}
      </UploadInputLayout>
      {((contentType.image.required && !imageValidation?.valid && imageValidation?.errorType !== '') || serverError) && (
        <TextValidation>{serverError || imageValidation?.errorType}</TextValidation>
      )}
    </>
  ) : (
    <LoaderContainer className="laoder-container">
      <FlexboxGrid justify="center" align="stretch">
        <Loader />
      </FlexboxGrid>
    </LoaderContainer>
  );
}
