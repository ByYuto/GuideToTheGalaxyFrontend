import React, { useEffect, useState, useRef } from 'react';
import Autocomplete from '../../UI/autocomplete/Autocomplete';
import { SearchKeywordLayout } from './styled-components';
import { GoIcon } from '../../../assets/icons/svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setKeyword } from '../../../redux/reducers/newArticleState';
import { setInputValue, getKeywordsSuggestions } from '../../../redux/reducers/keywords';
import Notice from '../../../components/UI/notice/Notice';
import { checkKeywordsLettersAllowed } from '../../../utils/utils';
export default function SearchKeywords() {
  const { inputValue, keywordsSuggestions } = useSelector((store) => store.keywords);
  const { step } = useSelector((store) => store.newArticle);
  const {
    newArticle: { keywords },
  } = useSelector((store) => store.newArticle);
  const [notice, setNotice] = useState(false);
  const [lastLetter, setLastLetter] = useState(null);
  const dispatch = useDispatch();
  const [autoCompleteFocus, setAutoCompleteFocus] = useState(false);
  const handleChange = (value) => {
    dispatch(setInputValue(value));
  };
  const onClearInputVal = () => dispatch(setInputValue(''));
  const setKeywordValue = () => {
    const index = keywords.findIndex((k) => k === inputValue);
    if (index === -1 && inputValue !== '' && keywords.length < 10) {
      dispatch(setKeyword(inputValue));
    } else {
      setNotice(true);
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
  useEffect(() => {
    if (step === 4) {
      setAutoCompleteFocus(true);
    } else {
      setAutoCompleteFocus(false);
    }
  }, [step]);
  const formattedSuggestions = keywordsSuggestions.map((k) => ({ active: inputValue === k, description: k }));
  return (
    <SearchKeywordLayout>
      {notice && (
        <Notice
          duration={4000}
          type="error"
          text={'You reach the max allowed keywords selected'}
          callBack={() => setNotice(false)}
        />
      )}
      <Autocomplete
        placeholder={'Write your own keyword...'}
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        onClearValue={onClearInputVal}
        onOptionSelect={onOptionSelect}
        suggestions={formattedSuggestions}
        setFocusOnMount={autoCompleteFocus}
        handleKeydown={(e) => {
          if (inputValue.length < 21) {
            const letterAllowed = checkKeywordsLettersAllowed(e);
            if (e.keyCode === 13) {
              setKeywordValue(inputValue);
              setLastLetter(null);
            } else if (letterAllowed) {
              if (e.keyCode === 32 || e.keyCode === 189 || e.keyCode === 109) {
                if (lastLetter === e.keyCode) {
                  e.preventDefault();
                  return;
                }
              }
              setLastLetter(e.keyCode);
            } else {
              if (e.keyCode === 8 || e.keyCode === 46) {
                return;
              } else {
                e.preventDefault();
                return;
              }
            }
          } else {
            if (e.keyCode === 8 || e.keyCode === 46) {
              return;
            } else {
              e.preventDefault();
              return;
            }
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
