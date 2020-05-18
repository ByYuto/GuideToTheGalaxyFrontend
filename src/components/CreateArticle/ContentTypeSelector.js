import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { FiChevronLeft } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';
import ScrollContainer from 'react-indiana-drag-scroll';
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
    color: ${(props) => (props.active ? props.theme.baseColors.white : props.theme.baseColors.light)};
    text-transform: uppercase;
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

const ContentType = ({ className, title, value, active, onClick, readOnly }) => {
  const _onClick = () => {
    !readOnly && onClick && onClick(value);
  };
  return (
    <StyledContentType className={className} onClick={_onClick} active={active} readOnly={readOnly}>
      <h6>{title}</h6>
    </StyledContentType>
  );
};

const CustomContentType = ({ className, title, value, active, onClick, readOnly, onChange, editableRef }) => {
  const _onClick = () => {
    !readOnly && onClick && onClick(value);
  };
  const _onBlur = (e) => {
    onChange && onChange(e.target.innerHTML);
  };
  const _onKeyDown = (e) => {
    if (
      (e.keyCode >= 65 && e.keyCode <= 90) ||
      (e.keyCode >= 97 && e.keyCode <= 122) ||
      e.keyCode === 32 || //SPACE
      e.keyCode === 8 || //BACKPSPACE
      e.keyCode === 46 //SUPR/DELETE
    ) {
      //Valid
      return;
    } else {
      e.preventDefault();
    }
  };

  return (
    <StyledContentType className={className} active={active} readOnly={readOnly} onClick={_onClick}>
      {/*<input value={value} onChange={_onChange} onClick={_onClick} />*/}
      <h6
        contentEditable={true}
        onBlur={_onBlur}
        suppressContentEditableWarning={true}
        onKeyDown={_onKeyDown}
        ref={editableRef}
      >
        {value}
      </h6>
    </StyledContentType>
  );
};

const convertToText = (contentType) => {
  return contentType.replace('_', ' ').toUpperCase();
};

const ContentTypeSelector = ({ contentTypes, value, onChange, readOnly }) => {
  const containerRef = useRef(null);
  const editableRef = useRef(null);
  const [newContentType, setNewContentType] = useState();
  const onContentTypeClick = (contentType) => {
    !readOnly && onChange && onChange(contentType);
  };

  const onRightArrowClick = () => (containerRef.current.scrollLeft += 50);
  const onLeftArrowClick = () => (containerRef.current.scrollLeft += 50);

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

  const onCustomContentChange = (newContentType) => {
    setNewContentType(newContentType);
    onChange(newContentType);
    setTimeout(() => (containerRef.current.scrollLeft += 99999), 100);
  };

  console.log('El nuevo contentType es', newContentType);
  return (
    <StyledContentTypeSelector>
      <ArrowButton onClick={onLeftArrowClick}>
        <FiChevronLeft />
      </ArrowButton>

      <ContentTypesList horizontal={readOnly === false} ref={containerRef}>
        {contentTypes.map((contentType, i) => (
          <ContentType
            key={contentType}
            title={convertToText(contentType)}
            value={contentType}
            active={contentType === value}
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
            title={convertToText(newContentType)}
            value={newContentType}
            active={newContentType === value}
            onClick={onCustomContentChange}
            readOnly={readOnly}
            onChange={onCustomContentChange}
            editableRef={editableRef}
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
