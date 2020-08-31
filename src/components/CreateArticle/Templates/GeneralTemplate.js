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
import { CheckIcon } from '../../../assets/icons/svg-icons';

const PickerDate = ({ value = new Date(), _onChange, contentType, readOnly }) => {
  const dispatch = useDispatch();
  const { articleValidations } = useSelector((store) => store.newArticle);
  useEffect(() => {
    handleDateValidation(value);
  }, [value.getDate(), articleValidations.length]);

  const handleDateValidation = (value) => {
    const validationsUpdate = contentType['date'].required ? [requiredDate] : [];
    const isValidDate = validate(value, validationsUpdate);
    const fieldValidation = {};
    fieldValidation['date'] = isValidDate.length > 0 ? isValidDate[0] : { valid: true, errorType: '' };
    dispatch(validateField(fieldValidation));
  };

  return (
    <PickerLayout>
      <DatePicker selected={value} onChange={_onChange} dateFormat="MMMM d, yyyy" readOnly={readOnly} />
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

  ${(props) =>
    props.field === 'URL'
      ? `
      
  & .close-btn {
    margin-right: 1.3em;
  }


  & input {
      padding-left: 10px:
  }


  
  `
      : ''}

  & .action-button {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: #6670f0;
    border: none;
    outline: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    opacity: ${(props) => (props.disabled ? '0.5' : '1')};
    cursor: pointer;

    & svg path,
    svg rect {
      fill: white;
      stroke: white;
    }
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
  readOnly,
}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [validUrl, setValidUrl] = useState(false);
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
      setValidUrl(fieldValidation[field].valid);
      await dispatch(validateField(fieldValidation));
    }
    return onChangeData(field, value);
  };
  const actionUrl =
    field === 'URL' ? (
      <button className="action-button" disabled={!validUrl}>
        <CheckIcon />
      </button>
    ) : null;
  return (
    <FormRow field={field} disabled={!validUrl}>
      <Input
        placeholder={textPlaceholder}
        value={newArticle[field]}
        block
        onChange={handleChangeValidations}
        onFocus={() => setTooltipVisible(true)}
        onBlur={() => setTooltipVisible(false)}
        readOnly={readOnly}
        actionButton={actionUrl}
      />
      {!validateError?.valid && validateError?.errorType && <TextValidation>{validateError?.errorType}</TextValidation>}
      {tooltipVisible && tooltip && <StyledFieldTooltip>{tooltip}</StyledFieldTooltip>}
    </FormRow>
  );
};

const GeneralTemplate = ({ contentType, article, onChangeData, readOnly }) => {
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
          readOnly={readOnly}
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
        readOnly={readOnly}
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
        readOnly={readOnly}
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
          readOnly={readOnly}
        />
      ) : null}
      <DivInputColumn>
        {contentType?.date && (
          <FormRow>
            <DivInputRow>
              <span>{textPlaceholder}</span>
              <PickerDate
                value={dateValue}
                _onChange={handleDateValidation}
                contentType={contentType}
                readOnly={readOnly}
              />
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
                readOnly={readOnly}
              />
            </div>
          </DivInputRow>
        )}
      </DivInputColumn>
    </div>
  );
};

export default GeneralTemplate;
