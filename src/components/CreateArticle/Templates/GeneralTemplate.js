import React, { useState } from 'react';
import Input from '../../UI/Input';
import styled from 'styled-components';
import { StyledFieldTooltip } from '../../../views/CreateArticle/StyledComponents';
import { useSelector } from 'react-redux';

const FormRow = styled.div`
  position: relative;
  /*margin-top: 10px;*/
  margin-bottom: 24px;
  & span {
    color: #9695b7;
    margin-right: 10px;
  }
  input::-webkit-calendar-picker-indicator {
    color: white;
    filter: invert(1);
  }
`;

const getPlaceHolderText = (field) => `${field.placeholder}${field.required ? '*' : ''}`;

const GeneralTemplate = ({ contentType, article, onChangeData }) => {
  const { newArticle } = useSelector((state) => state.newArticle);
  const InputRow = (field, placeholderText) => {
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const tooltip = contentType ? contentType[field]?.tooltip : `${field} tooltip`;
    const textPlaceholder = contentType ? getPlaceHolderText(contentType[field]) : placeholderText;
    return (
      <FormRow>
        <Input
          placeholder={textPlaceholder}
          value={newArticle[field]}
          block
          onChange={(value) => onChangeData(field, value)}
          onFocus={() => setTooltipVisible(true)}
          onBlur={() => setTooltipVisible(false)}
        />
        {tooltipVisible && tooltip && <StyledFieldTooltip>{tooltip}</StyledFieldTooltip>}
      </FormRow>
    );
  };

  const textPlaceholder = contentType ? getPlaceHolderText(contentType.date) : 'Date passed*';
  return (
    <div>
      {InputRow('location', 'Location', 'text')}
      {InputRow('title', 'Title', 'text')}
      {InputRow('URL', 'Link to more info')}
      {
        <FormRow>
          <span>{textPlaceholder}</span>
          <Input
            placeholder={textPlaceholder}
            value={article.date}
            onChange={(value) => onChangeData('date', value)}
            type="date"
          />
        </FormRow>
      }
    </div>
  );
};

export default GeneralTemplate;
