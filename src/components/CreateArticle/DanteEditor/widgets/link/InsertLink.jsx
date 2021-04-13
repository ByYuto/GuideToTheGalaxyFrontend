import React, { useState, useEffect, useRef } from 'react';
import { CheckIcon, LinkIcon } from '../../../../../assets/icons/svg-icons';
import { InputLinkLayout, ClearButton } from './styled-components';
import { validateUrl } from '../../../../../utils/validations';
import { IoIosClose } from 'react-icons/io';
import FlexContainer from '../../../../UI/FlexContainer';
import useOnClickOutside from 'react-cool-onclickoutside';

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
  const [validEmbed, setValidEmbed] = useState(false);
  const [url, setUrl] = useState(initialValue || '');
  const ref = useOnClickOutside(() => {
    console.log('Click outside');
    onCancel();
  });

  useEffect(() => {
    setUrl(initialValue || '');
  }, [initialValue]);
  //const editorStateBackupRef = useRef(editorState);
  const _onChange = (e) => setUrl(e.target.value);
  const applyValueIfValid = () => {
    console.log('applyValueIfValid', validEmbed);
    if (validEmbed) {
      console.log('Calling onApplyLink');
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
  const _onButtonClick = (e) => {
    e.preventDefault();
    console.log('On button Click, calling applyValueIfValid');
    applyValueIfValid();
  };

  const _onClear = (e) => {
    e.preventDefault();
    console.log('Clearing value');
    onApplyLink('');
  };

  useEffect(() => {
    const isValid = validateUrl(url, true);
    setValidEmbed(isValid.valid || url === '');
  }, [url]);

  //console.log({ validEmbed, url });
  return (
    <InputLinkLayout disabled={!validEmbed} ref={ref}>
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
        <button className="action-button" disabled={!validEmbed} onMouseDown={_onButtonClick}>
          <CheckIcon />
        </button>
      </FlexContainer>
    </InputLinkLayout>
  );
}
