import React, { useState, useEffect } from 'react';
import Input from '../../Input';
import { CheckIcon, LinkIcon } from '../../../../assets/icons/svg-icons';
import { InputLinkLayout } from '../styledComponents';
import { validateEmbed } from '../../../../utils/validations';
import { ReactEditor } from 'slate-react';

export default function InsertLink({ setLink, handleLink, setUrl, url, editor }) {
  const [validEmbed, setValidEmbed] = useState(false);
  const [submited, isSubmitted] = useState(false);
  const handleEmbedValue = (value) => {
    setUrl(value);
  };

  useEffect(() => {
    const isValid = validateEmbed(url, true);
    setValidEmbed(isValid.valid);
  }, [url, submited]);

  const handleSubmitValue = async (e) => {
    if (validEmbed) {
      setLink(false);
      handleLink();
    }
  };

  const handleEnterSubmit = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      ReactEditor.focus(editor);
      setTimeout(handleSubmitValue, 350);
    }
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
        block
        onChange={(value) => handleEmbedValue(value.toLowerCase())}
        readOnly={false}
        onBlur={null}
        onFocus={null}
        actionButton={
          <button
            className="action-button"
            disabled={!validEmbed}
            onClick={(e) => {
              ReactEditor.focus(editor);
              setTimeout(handleSubmitValue, 350);
            }}
          >
            <CheckIcon />
          </button>
        }
      />
    </InputLinkLayout>
  );
}
