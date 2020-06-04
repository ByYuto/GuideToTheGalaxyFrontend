import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { FiChevronLeft } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';
//import ScrollContainer from 'react-indiana-drag-scroll';
import Button from '../UI/Button';
import { GoPlus } from 'react-icons/go';

const StyledContentType = styled.div`
  display: flex;
  flex-direction: row;
  background: ${(props) => (props.active ? props.theme.accentColors.primary.color : props.theme.baseColors.darkMiddle)};
  border-radius: 8px;
  border: 1px solid transparent;
  padding-right: 8px;
  padding-left: 8px;
  cursor: ${(props) => (props.readOnly ? 'default' : 'pointer')};
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-grow: 0;
  flex-shrink: 0;
  height: 2rem;
  min-width: 100px;
  margin: 0 8px;

  &:hover {
    ${(props) =>
      !props.readOnly
        ? css`
            border: 1px solid ${props.theme.accentColors.primary.color};
          `
        : null}
  }

  h6 {
    padding: 0;
    margin: 0;
    display: block;
    flex-grow: 1;
    color: ${(props) => (props.active ? props.theme.baseColors.white : props.theme.baseColors.light)};
    text-transform: uppercase;

    &:focus {
      outline: none;
    }
  }

  button {
    margin-left: 10px;
  }
`;

const ArrowButton = styled.button`
  all: unset;
  font-size: 1.5em;
  cursor: pointer;
`;

const ContentTypesList = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0 0 10px 0;
  flex-wrap: nowrap;
  flex-grow: 1;
  align-items: center;
`;

const StyledContentTypeSelector = styled.div`
  display: flex;
  overflow: hidden;
  margin: 8px 0;
  width: 100%;
`;

const AddContentTypeButton = styled(Button)`
  display: flex;
  font-size: 12px;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  background: ${(props) => props.theme.baseColors.middle};
  color: ${(props) => props.theme.baseColors.darker};
`;

const ContentType = ({ className, value, active, onClick, readOnly }) => {
  const _onClick = () => {
    !readOnly && onClick && onClick(value);
  };
  return (
    <StyledContentType className={className} onClick={_onClick} active={active} readOnly={readOnly}>
      <h6>{value}</h6>
    </StyledContentType>
  );
};

const CustomContentType = ({
  className,
  value,
  active,
  onClick,
  readOnly,
  onChange,
  editableRef,
  onClearContentType,
  onBlur,
}) => {
  const _onClick = () => {
    !readOnly && onClick && onClick(value);
  };
  const _onBlur = (e) => {
    const value = (e.target.textContent || e.target.innerText).toUpperCase() || null;
    onChange && onChange(value);
    onBlur && onBlur(value);
  };
  const _onKeyDown = (e) => {
    console.log('KeyDown', e.keyCode, e.which, e.charCode, e.key);
    if (
      (e.keyCode >= 65 && e.keyCode <= 90) || //Uppercase letters
      (e.keyCode >= 97 && e.keyCode <= 122) || //Lowercase letters
      e.keyCode === 32 || //SPACE
      e.keyCode === 8 || //BACKPSPACE
      e.keyCode === 46 || //SUPR/DELETE
      e.keyCode === 37 || //LEFT ARROW
      e.keyCode === 39 || // RIGHT ARROW
      e.keyCode === 35 || // END
      e.keyCode === 36 || // HOME
      e.key === '&' //Ampersand
    ) {
      //Valid
      return;
    } else if (e.keyCode === 13) {
      //const value = (e.target.textContent || e.target.innerText).toUpperCase() || null;
      //onChange && onChange(value);
      //onBlur && onBlur(value);
      editableRef.current.blur();
      e.preventDefault();
    } else if (e.keyCode === 27) {
      onChange && onChange(null);
      onBlur && onBlur(null);
    } else {
      e.preventDefault();
    }
  };

  const _onPaste = (e) => {
    e.preventDefault();
    let text = (e.originalEvent || e).clipboardData.getData('text/plain');
    text = text.replace(/(<([^>]+)>)/gi, ''); //Remove HTML tags
    text = text.replace(/[^0-9a-z\s&]/gi, ''); //Remove all characters except numbers, letters, spaces and &
    text = text.replace(/\s\s+/g, ' '); //Convert multiple spaces into one
    document.execCommand('insertHTML', false, text.toUpperCase());
  };

  return (
    <StyledContentType className={className} active={active} readOnly={readOnly} onClick={_onClick}>
      <h6
        contentEditable={!readOnly}
        onBlur={_onBlur}
        suppressContentEditableWarning={true}
        onKeyDown={_onKeyDown}
        ref={editableRef}
        onPaste={_onPaste}
      >
        {value}
      </h6>
      {!readOnly ? (
        <Button onClick={onClearContentType} transparent secondary icon>
          X
        </Button>
      ) : null}
    </StyledContentType>
  );
};

/*
const convertToText = (contentType) => {
  return contentType.replace('_', ' ').toUpperCase();
};
*/

const ContentTypeSelector = ({ contentTypes, value, onChange, onCustomContentBlur, readOnly }) => {
  const containerRef = useRef(null);
  const editableRef = useRef(null);
  const [newContentType, setNewContentType] = useState();
  const onContentTypeClick = (contentType) => {
    !readOnly && onChange && onChange(contentType);
  };

  useEffect(() => {
    setNewContentType(null); //If contentTypes is changed, reset newContentType
  }, [JSON.stringify(contentTypes)]);

  const onRightArrowClick = () => (containerRef.current.scrollLeft += 50);
  const onLeftArrowClick = () => (containerRef.current.scrollLeft -= 50);

  const onAddNewContentTypeClick = (e) => {
    const contentType = 'New Content Type';
    setNewContentType(contentType);
    onChange(contentType);
    setTimeout(() => {
      containerRef.current.scrollLeft += 99999;
      editableRef.current && editableRef.current.focus();
      window.getSelection().selectAllChildren(editableRef.current);
    }, 10);
  };

  const onClearContentType = () => {
    setTimeout(() => {
      setNewContentType(null);
      onChange(null);
      onCustomContentBlur(null);
    }, 1);
  };

  const onCustomContentChange = (newContentType) => {
    setNewContentType(newContentType);
    onChange(newContentType);
    setTimeout(() => (containerRef.current.scrollLeft += 99999), 100);
  };

  //console.log('El nuevo contentType es', newContentType);
  return (
    <StyledContentTypeSelector>
      <ArrowButton onClick={onLeftArrowClick}>
        <FiChevronLeft />
      </ArrowButton>

      <ContentTypesList readonly={readOnly} ref={containerRef}>
        {contentTypes.map((contentType) => (
          <ContentType
            key={contentType.name}
            value={contentType.name}
            active={contentType.name === value}
            onClick={onContentTypeClick}
            readOnly={readOnly}
          />
        ))}
        {!newContentType ? (
          !readOnly ? (
            <AddContentTypeButton secondary circle onClick={onAddNewContentTypeClick} icon>
              <GoPlus />
            </AddContentTypeButton>
          ) : null
        ) : (
          <CustomContentType
            value={newContentType}
            active={newContentType === value}
            onClick={onCustomContentChange}
            readOnly={readOnly}
            onChange={onCustomContentChange}
            editableRef={editableRef}
            onClearContentType={onClearContentType}
            onBlur={onCustomContentBlur}
          />
        )}
      </ContentTypesList>

      <ArrowButton onClick={onRightArrowClick}>
        <FiChevronRight />
      </ArrowButton>
    </StyledContentTypeSelector>
  );
};

export default ContentTypeSelector;