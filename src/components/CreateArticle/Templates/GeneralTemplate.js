import React from 'react';
import Input from '../../UI/Input';

const GeneralTemplate = ({ contentType, article, onChangeData }) => {
  return (
    <div>
      <p>Template: General</p>
      {contentType.title ? (
        <Input
          placeholder={contentType.title.placeholder}
          value={article.title}
          block
          onChange={(value) => onChangeData('title', value)}
        />
      ) : null}
      <Input placeholder="caca" value={article.title} block onChange={(value) => onChangeData('title', value)} />
    </div>
  );
};

export default GeneralTemplate;
