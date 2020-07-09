import React, { useState } from 'react';
import Input from '../../UI/Input';
import styled from 'styled-components';
import { StyledFieldTooltip } from '../../../views/CreateArticle/StyledComponents';

const FormRow = styled.div`
  position: relative;
  margin-top: 10px;
  margin-bottom: 10px;

  input::-webkit-calendar-picker-indicator {
    color: white;
    filter: invert(1);
  }
`;

const getPlaceHolderText = (field) => `${field.placeholder}${field.required ? '*' : ''}`;

const GeneralTemplate = ({ contentType, article, onChangeData }) => {
  const InputRow = (field) => {
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const tooltip = contentType[field]?.tooltip;
    return (
      <FormRow>
        <Input
          placeholder={getPlaceHolderText(contentType[field])}
          value={article[field]}
          block
          onChange={(value) => onChangeData(field, value)}
          onFocus={() => setTooltipVisible(true)}
          onBlur={() => setTooltipVisible(false)}
        />
        {tooltipVisible && tooltip && <StyledFieldTooltip>{tooltip}</StyledFieldTooltip>}
      </FormRow>
    );
  };

  return (
    <div>
      <p>Template: General</p>
      {contentType.location ? InputRow('location', 'text') : null}
      {contentType.title ? InputRow('title', 'text') : null}
      {contentType.URL ? InputRow('URL', 'url') : null}
      {contentType.date ? (
        <FormRow>
          <span>{getPlaceHolderText(contentType.date)}</span>
          <Input
            placeholder={getPlaceHolderText(contentType.date)}
            value={article.date}
            onChange={(value) => onChangeData('date', value)}
            type="date"
          />
        </FormRow>
      ) : null}
    </div>
  );
};

export default GeneralTemplate;
