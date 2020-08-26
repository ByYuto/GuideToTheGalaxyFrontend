import React, { useState, useEffect } from 'react';
import Input, { PickerLayout } from '../../UI/Input';
import styled from 'styled-components';
import { StyledFieldTooltip } from '../../../views/CreateArticle/StyledComponents';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Toggle from '../../UI/Toggle';
import { DivInputColumn, DivInputRow } from '../styledComponents';
import { validate, isRequired, validateMaxLength, validateUrl, requiredDate } from '../../../utils/validations';
import { validateField } from '../../../redux/reducers/newArticleState';
import { TextValidation } from '../../UI/forms/styledComponents';

const PickerDate = ({ value = new Date(), _onChange, contentType }) => {
  const dispatch = useDispatch();
  const { articleValidations } = useSelector((store) => store.newArticle);
  useEffect(() => {
    handleDateValidation(value);
  }, [value.getDate(), articleValidations.length]);

  const handleDateValidation = async (value) => {
    const validationsUpdate = contentType['date'].required ? [requiredDate] : [];
    const isValidDate = validate(value, validationsUpdate);
    const fieldValidation = {};
    fieldValidation['date'] = isValidDate.length > 0 ? isValidDate[0] : { valid: true, errorType: '' };
    await dispatch(validateField(fieldValidation));
  };
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

const InputRow = ({
  field,
  placeholderText,
  contentType,
  newArticle,
  onChangeData,
  validate,
  validations,
  validateError,
}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const dispatch = useDispatch();
  const tooltip = contentType ? contentType[field]?.tooltip : `${field} tooltip`;
  const textPlaceholder = contentType ? getPlaceHolderText(contentType[field]) : placeholderText;
  const dataType = contentType[field];
  const handleChangeValidations = async (value) => {
    if (validate && validations) {
      const validationsUpdate = dataType.required ? [isRequired, ...validations] : validations;
      const isValid = validate(value, validationsUpdate);
      const fieldValidation = {};
      fieldValidation[field] = isValid.length > 0 ? isValid[0] : { valid: true, errorType: '' };
      await dispatch(validateField(fieldValidation));
    }
    return onChangeData(field, value);
  };
  return (
    <FormRow>
      <Input
        placeholder={textPlaceholder}
        value={newArticle[field]}
        block
        onChange={handleChangeValidations}
        onFocus={() => setTooltipVisible(true)}
        onBlur={() => setTooltipVisible(false)}
      />
      {!validateError?.valid && validateError?.errorType && <TextValidation>{validateError?.errorType}</TextValidation>}
      {tooltipVisible && tooltip && <StyledFieldTooltip>{tooltip}</StyledFieldTooltip>}
    </FormRow>
  );
};

const GeneralTemplate = ({ contentType, article, onChangeData }) => {
  const { newArticle, articleValidations } = useSelector((state) => state.newArticle);
  const dispatch = useDispatch();
  const textPlaceholder = contentType && contentType.date ? getPlaceHolderText(contentType.date) : 'Date passed';
  const dateValue = article && article.date ? new Date(article.date) : new Date();

  const handleDateValidation = async (value) => {
    return onChangeData('date', value);
  };

  return (
    <div>
      {contentType?.location ? (
        <InputRow
          field={'location'}
          placeholderText={'Location'}
          contentType={contentType}
          newArticle={newArticle}
          onChangeData={onChangeData}
          validate={validate}
          validations={[]}
          validateError={articleValidations.location}
        />
      ) : null}
      <InputRow
        field={'title'}
        placeholderText={'Title'}
        contentType={contentType}
        newArticle={newArticle}
        onChangeData={onChangeData}
        validate={validate}
        validations={[validateMaxLength]}
        validateError={articleValidations.title}
      />
      <InputRow
        field={'URL'}
        placeholderText={'Link to more info'}
        contentType={contentType}
        newArticle={newArticle}
        onChangeData={onChangeData}
        validate={validate}
        validations={[validateUrl]}
        validateError={articleValidations.URL}
      />
      {contentType?.other?.type === 'text' ? (
        <InputRow
          field={'other'}
          placeholderText={contentType.other.placeholder}
          contentType={contentType}
          newArticle={newArticle}
          onChangeData={onChangeData}
          validate={validate}
          validations={[]}
          validateError={articleValidations.other}
        />
      ) : null}
      <DivInputColumn>
        {contentType?.date && (
          <FormRow>
            <DivInputRow>
              <span>{textPlaceholder}</span>
              <PickerDate value={dateValue} _onChange={handleDateValidation} contentType={contentType} />
            </DivInputRow>
          </FormRow>
        )}
        {contentType?.other?.type === 'boolean' && (
          <DivInputRow>
            <span style={{ marginBottom: '24px' }}>{contentType.other.placeholder}</span>
            <div style={{ marginBottom: '24px' }}>
              <Toggle
                checked={article.discontinued_law}
                onChange={(value) => onChangeData('discontinued_law', value)}
                tooltipText={contentType.other.tooltip || 'Toggle tooltip'}
              />
            </div>
          </DivInputRow>
        )}
      </DivInputColumn>
    </div>
  );
};

export default GeneralTemplate;
