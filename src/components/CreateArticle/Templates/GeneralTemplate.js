import React, { useState } from 'react';
import Input, { PickerLayout } from '../../UI/Input';
import styled from 'styled-components';
import { StyledFieldTooltip } from '../../../views/CreateArticle/StyledComponents';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Toggle from '../../UI/Toggle';

const PickerDate = ({ value = new Date(), _onChange }) => {
  return (
    <PickerLayout>
      <DatePicker selected={value} onChange={_onChange} dateFormat="MMMM d, yyyy" />
    </PickerLayout>
  );
};

const FormRow = styled.div`
  position: relative;
  /*margin-top: 10px;*/
  margin-bottom: 24px;
  & .react-datepicker__header {
    background-color: white;
  }
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

const InputRow = ({ field, placeholderText, contentType, newArticle, onChangeData }) => {
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

const GeneralTemplate = ({ contentType, article, onChangeData }) => {
  const { newArticle } = useSelector((state) => state.newArticle);

  const textPlaceholder = contentType && contentType.date ? getPlaceHolderText(contentType.date) : 'Date passed';
  const dateValue = article && article.date ? new Date(article.date) : new Date();
  return (
    <div>
      {contentType?.location ? (
        <InputRow
          field={'location'}
          placeholderText={'Location'}
          contentType={contentType}
          newArticle={newArticle}
          onChangeData={onChangeData}
        />
      ) : null}
      <InputRow
        field={'title'}
        placeholderText={'Title'}
        contentType={contentType}
        newArticle={newArticle}
        onChangeData={onChangeData}
      />
      <InputRow
        field={'URL'}
        placeholderText={'Link to more info'}
        contentType={contentType}
        newArticle={newArticle}
        onChangeData={onChangeData}
      />
      {contentType?.other && contentType?.other.type === 'text' ? (
        <InputRow
          field={'other'}
          placeholderText={contentType.other.placeholder}
          contentType={contentType}
          newArticle={newArticle}
          onChangeData={onChangeData}
        />
      ) : null}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {contentType?.date && (
          <FormRow>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span>{textPlaceholder}</span>
              <PickerDate value={dateValue} _onChange={(value) => onChangeData('date', value)} />
            </div>
          </FormRow>
        )}
        {contentType?.other && contentType?.other.type === 'boolean' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ marginBottom: '24px' }}>{contentType.other.placeholder}</span>
            <div style={{ marginBottom: '24px' }}>
              <Toggle
                checked={article.discontinued_law}
                onChange={(value) => onChangeData('discontinued_law', value)}
                tooltipText={contentType.other.tooltip || 'Toggle tooltip'}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralTemplate;
