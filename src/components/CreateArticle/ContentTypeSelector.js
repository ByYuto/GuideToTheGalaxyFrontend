import React from 'react';
import styled, { css } from 'styled-components';
import { FiChevronLeft } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';
import ScrollContainer from 'react-indiana-drag-scroll';
import Button from '../UI/Button';
import { GoPlus } from 'react-icons/go';

const StyledContentType = styled.div`
  display: flex;
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
  }
`;

const ArrowButton = styled.button`
  all: unset;
  font-size: 1.5em;
`;

const ContentTypesList = styled(ScrollContainer)`
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

const ContentType = ({ className, title, description, value, active, onClick, readOnly }) => {
  const _onClick = () => {
    !readOnly && onClick && onClick(value);
  };
  return (
    <StyledContentType className={className} onClick={_onClick} active={active} readOnly={readOnly}>
      <h6>{title}</h6>
    </StyledContentType>
  );
};

const convertToText = (contentType) => {
  return contentType.replace('_', ' ').toUpperCase();
};

const ContentTypeSelector = ({ contentTypes, value, onChange, readOnly }) => {
  const onContentTypeClick = (contentType) => {
    !readOnly && onChange && onChange(contentType);
  };

  return (
    <StyledContentTypeSelector>
      <ArrowButton>
        <FiChevronLeft />
      </ArrowButton>

      <ContentTypesList horizontal={readOnly === false}>
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
        <AddContentTypeButton secondary circle onClick={null} icon>
          <GoPlus />
        </AddContentTypeButton>
      </ContentTypesList>

      <ArrowButton>
        <FiChevronRight />
      </ArrowButton>
    </StyledContentTypeSelector>
  );
};

export default ContentTypeSelector;
