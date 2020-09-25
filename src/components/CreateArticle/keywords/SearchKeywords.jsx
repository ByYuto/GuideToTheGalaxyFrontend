import React, { useState, useEffect } from 'react';
import Input from '../../UI/Input';
import Autocomplete from '../../UI/autocomplete/Autocomplete';
import { SearchKeywordLayout } from './styled-components';
import { GoIcon } from '../../../assets/icons/svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setKeyword } from '../../../redux/reducers/newArticleState';
import { setInputValue, getKeywordsSuggestions } from '../../../redux/reducers/keywords';

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
  const onClearInputVal = () => dispatch(setInputValue(''));
  const setKeywordValue = () => {
    const index = keywords.findIndex((k) => k === inputValue);
    if (index === -1 && inputValue !== '') {
      dispatch(setKeyword(inputValue));
    }
    dispatch(setInputValue(''));
  };
  const onOptionSelect = (value) => {
    dispatch(setInputValue(value));
  };
  useEffect(() => {
    if (inputValue.length > 2) {
      setTimeout(() => dispatch(getKeywordsSuggestions(inputValue)), 500);
    }
  }, [inputValue]);
  const formattedSuggestions = keywordsSuggestions.map((k) => ({ active: inputValue === k, description: k }));
  return (
    <SearchKeywordLayout focused={focus}>
      <Autocomplete
        placeholder={'Write your own keyword...'}
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        onClearValue={onClearInputVal}
        onOptionSelect={onOptionSelect}
        suggestions={formattedSuggestions}
        patternAllowed={'^[a-zA-Z0-9\s\-]+$'}
        handleKeydown={(e) => {
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
