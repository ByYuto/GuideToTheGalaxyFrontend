import React from 'react';
import Input from '../../UI/Input';
import styled from 'styled-components';

const FormRow = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const getPlaceHolderText = (field) => `${field.placeholder}${field.required ? '*' : ''}`;

const GeneralTemplate = ({ contentType, article, onChangeData }) => {
  const InputRow = (field) => {
    return (
      <FormRow>
        <Input
          placeholder={getPlaceHolderText(contentType[field])}
          value={article[field]}
          block
          onChange={(value) => onChangeData(field, value)}
        />
      </FormRow>
    );
  };

  return (
    <div>
      <p>Template: General</p>
      {contentType.location ? InputRow('location') : null}
      {contentType.title ? InputRow('title') : null}
      {contentType.URL ? InputRow('URL') : null}
      {contentType.date ? (
        <FormRow>
          <span>{getPlaceHolderText(contentType.date)}</span>
          <Input
            placeholder={getPlaceHolderText(contentType.date)}
            value={article.date}
            onChange={(value) => onChangeData('date', value)}
          />
        </FormRow>
      ) : null}
    </div>
  );
};

export default GeneralTemplate;
