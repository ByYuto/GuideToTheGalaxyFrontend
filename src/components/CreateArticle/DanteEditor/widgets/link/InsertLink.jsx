import React, { useState, useEffect } from 'react';
import Input from './Input';
import { CheckIcon, LinkIcon } from '../../../../../assets/icons/svg-icons';
import { InputLinkLayout } from './styled-components';
import { validateEmbed } from '../../../../../utils/validations';

export default function InsertLink({ onKeyDown, fref, url, onClickBtn, editorState, onChangeInput }) {
  const [validEmbed, setValidEmbed] = useState(false);

  useEffect(() => {
    const isValid = validateEmbed(url, true);
    setValidEmbed(isValid.valid);
  }, [url]);

  const handleSubmitValue = async (e, editorState) => {
    if (validEmbed) {
      onClickBtn(editorState);
    }
  };

  const handleEnterSubmit = (e) => {
    onKeyDown(e, editorState);
  };

  return (
    <InputLinkLayout disabled={!validEmbed} onKeyDown={handleEnterSubmit}>
      <Input
        leftIcon={
          <>
            <LinkIcon className="icon-search" />
          </>
        }
        placeholder={'Paste your link'}
        value={url}
        ref={fref}
        block
        onChange={(value) => onChangeInput(value)}
        readOnly={false}
        onBlur={null}
        onFocus={null}
        actionButton={
          <button
            className="action-button"
            disabled={!validEmbed}
            onClick={(e) => {
              handleSubmitValue(e, editorState);
            }}
          >
            <CheckIcon />
          </button>
        }
      />
    </InputLinkLayout>
  );
}
