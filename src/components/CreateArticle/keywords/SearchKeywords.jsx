import React, { useState, useEffect } from 'react';
import Input from '../../UI/Input';
import { SearchKeywordLayout } from './styled-components';
import { GoIcon } from '../../../assets/icons/svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setKeyword } from '../../../redux/reducers/newArticleState';
import { setInputValue } from '../../../redux/reducers/keywords';

export default function SearchKeywords() {
  const [focus, setFocus] = useState(false);
  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);
  const { inputValue, keywordsSuggestions } = useSelector((store) => store.keywords);
  const {
    newArticle: { keywords },
  } = useSelector((store) => store.newArticle);
  const dispatch = useDispatch();
  const handleChange = (value) => {
    dispatch(setInputValue(value));
  };
  const setKeywordValue = () => {
    const index = keywords.findIndex((k) => k === inputValue);
    if (index === -1) {
      dispatch(setKeyword(inputValue));
    }
    dispatch(setInputValue(''));
  };
  useEffect(() => {
    if (inputValue.length > 2) {
      //setTimeout(() => dispatch(getEmbedArticles(filter)), 500);
    }
  }, [inputValue]);
  return (
    <SearchKeywordLayout focused={focus}>
      <Input
        placeholder={'Write your own keyword...'}
        value={inputValue}
        block
        onChange={(value) => handleChange(value)}
        readOnly={false}
        onBlur={handleBlur}
        onFocus={handleFocus}
        avoidSpecialCharacters
        autoCompleteOptions={keywordsSuggestions}
        pattern="[a-zA-Z]+"
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            setKeywordValue(inputValue);
          }
        }}
        actionButton={
          <button className="action-button" onClick={() => setKeywordValue(inputValue)}>
            <GoIcon />
          </button>
        }
      />
    </SearchKeywordLayout>
  );
}
