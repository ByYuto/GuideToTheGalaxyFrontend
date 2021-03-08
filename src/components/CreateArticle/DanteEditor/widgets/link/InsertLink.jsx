import React, { useState, useEffect } from 'react';
import { CheckIcon, LinkIcon } from '../../../../../assets/icons/svg-icons';
import { InputLinkLayout, ClearButton } from './styled-components';
import { validateUrl } from '../../../../../utils/validations';
import { IoIosClose } from 'react-icons/io';
import FlexContainer from '../../../../UI/FlexContainer';
export default function InsertLink({
  onKeyDown,
  url,
  onClickBtn,
  editorState,
  onChangeInput,
  onClear,
  inputRef,
  onBlur,
}) {
  const [validEmbed, setValidEmbed] = useState(false);

  useEffect(() => {
    const isValid = validateUrl(url, true);
    setValidEmbed(isValid.valid || url === '');
  }, [url]);

  const handleSubmitValue = async (e, editorState) => {
    if (validEmbed) {
      onClickBtn(editorState);
    }
  };

  const handleEnterSubmit = (e) => {
    if (validEmbed) {
      onKeyDown(e, editorState);
    }
  };

  return (
    <InputLinkLayout disabled={!validEmbed} onKeyDown={handleEnterSubmit} onBlur={onBlur}>
      <>
        <LinkIcon className="icon-search" />
      </>
      <input
        value={url}
        onChange={(e) => onChangeInput(e.target.value)}
        placeholder={'Paste your link'}
        onKeyDown={(e) => {
          handleEnterSubmit(e);
        }}
        ref={inputRef}
      />
      <FlexContainer align="center">
        {url && (
          <ClearButton className="close-btn" onMouseDown={onClear} color="#9695B7">
            <IoIosClose />
          </ClearButton>
        )}
        <button
          className="action-button"
          disabled={!validEmbed}
          onMouseDown={(e) => {
            handleSubmitValue(e, editorState);
          }}
        >
          <CheckIcon />
        </button>
      </FlexContainer>
    </InputLinkLayout>
  );
}
