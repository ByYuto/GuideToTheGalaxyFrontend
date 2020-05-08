import React, { useState } from 'react';
import styled from 'styled-components';
import Caption from '../UI/Caption';
import { FiChevronLeft } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';

const StyledContentType = styled.li`
  display: flex;
  background: ${props => props.active ? props.theme.accentColors.primary.color : props.theme.baseColors.darkMiddle};
  border-radius: 8px;
  border: 1px solid transparent;
  padding-right: 8px;
  padding-left: 8px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-grow: 0;
  flex-shrink: 0;
  height: 2rem;
  min-width: 100px;
  margin: 0 8px;

  &:hover {
    border: 1px solid ${props => props.theme.accentColors.primary.color};
  }

  h6 {
    padding: 0;
    margin: 0;
    display: block;
    color: ${props => props.active ? props.theme.baseColors.white : props.theme.baseColors.light};  
  } 
`;

const ArrowButton = styled.button`
all: unset;
font-size: 1.5em;
`

const ContentTypesList = styled.ul`
  overflow: auto;
  display: flex;
  margin: 0;
  padding: 0 0 10px 0;
  flex-wrap: nowrap;
  flex-grow: 1;
`

const StyledContentTypeSelector = styled.div`
  display: flex;
  overflow: hidden;
  margin: 16px 0;
  width: 100%;
`;

const ContentType = ({ className, title, description, value, active, onClick }) => {
  const _onClick = () => {
    onClick && onClick(value);
  }
  return <StyledContentType className={className} onClick={_onClick} active={active}>
    <h6>{title}</h6>
  </StyledContentType>
}

const convertToText = contentType => {
  return contentType.replace("_", " ").toUpperCase();
}
const ContentTypeSelector = ({ contentTypes, value, onChange }) => {
  const [hiddenItems, setHidden] = useState(0);

  const onContentTypeClick = (contentType) => {
    onChange && onChange(contentType);
  }

  return <StyledContentTypeSelector>
    <ArrowButton><FiChevronLeft /></ArrowButton>
    <ContentTypesList>
      {contentTypes.map((contentType, i) => i >= hiddenItems ? <ContentType key={contentType} title={convertToText(contentType)} value={contentType} active={contentType === value} onClick={onContentTypeClick} /> : null)}
    </ContentTypesList>
    <ArrowButton><FiChevronRight /></ArrowButton>
  </StyledContentTypeSelector>
}

export default ContentTypeSelector;