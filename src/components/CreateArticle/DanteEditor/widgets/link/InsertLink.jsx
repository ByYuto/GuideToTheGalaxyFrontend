import React, { useState, useEffect, useRef } from 'react';
import { CheckIcon, LinkIcon } from '../../../../../assets/icons/svg-icons';
import { InputLinkLayout, ClearButton } from './styled-components';
import { validateUrl } from '../../../../../utils/validations';
import { IoIosClose } from 'react-icons/io';
import FlexContainer from '../../../../UI/FlexContainer';
export default function InsertLink({
  //onKeyDown,
  //url,
  //onClickBtn,
  //editorState,
  //onChangeInput,
  //onClear,
  inputRef,
  onBlur,
  initialValue = '',
  onApplyLink = () => {},
  onCancel = () => {},
}) {
  const [focused, setFocused] = useState(false);
  const [validEmbed, setValidEmbed] = useState(false);
  const [url, setUrl] = useState(initialValue || '');

  useEffect(() => {
    setUrl(initialValue || '');
  }, [initialValue]);
  //const editorStateBackupRef = useRef(editorState);
  const _onChange = (e) => setUrl(e.target.value);
  const applyValueIfValid = () => {
    if (validEmbed) {
      onApplyLink(url);
    }
  };
  const _onKeyDown = (e) => {
    if (e.which === 13) {
      e.preventDefault();
      applyValueIfValid();
    } else if (e.which === 27) {
      onCancel();
    }
  };
  const _onButtonClick = () => {
    applyValueIfValid();
  };
  const _onFocus = () => {
    console.log('Focused');
  };

  const _onBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      console.log('Blurred');
      onCancel();
    }
  };
  const _onClear = () => setUrl('');

  useEffect(() => {
    const isValid = validateUrl(url, true);
    setValidEmbed(isValid.valid || url === '');
  }, [url]);

  return (
    <InputLinkLayout disabled={!validEmbed} tabIndex={-1} onBlur={_onBlur} onFocus={_onFocus}>
      <>
        <LinkIcon className="icon-search" />
      </>
      <input value={url} onChange={_onChange} onKeyDown={_onKeyDown} placeholder={'Paste your link'} ref={inputRef} />
      <FlexContainer align="center">
        {url && (
          <ClearButton className="close-btn" onMouseDown={_onClear} color="#9695B7">
            <IoIosClose />
          </ClearButton>
        )}
        <button className="action-button" disabled={!validEmbed} onClick={_onButtonClick}>
          <CheckIcon />
        </button>
      </FlexContainer>
    </InputLinkLayout>
  );
}
