import React, { useState, useEffect } from 'react';
import Input from '../Input';
import { SearchBarLayout } from './styledComponents';
import { SearchIcon, GoIcon } from '../../../assets/icons/svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { getEmbedArticles, setFilterValue } from '../../../redux/reducers/articles';

export default function SearchBar() {
  const [focus, setFocus] = useState(false);
  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);
  const { filter } = useSelector((store) => store.articles);
  const dispatch = useDispatch();
  const handleChange = (value) => {
    dispatch(setFilterValue(value));
  };
  useEffect(() => {
    if (filter.length > 2) {
      //setTimeout(() => dispatch(getEmbedArticles(filter)), 500);
      dispatch(getEmbedArticles(filter));
    }
  }, [filter]);
  return (
    <SearchBarLayout focused={focus}>
      <Input
        leftIcon={
          <>
            <SearchIcon className="icon-search" />
          </>
        }
        placeholder={'Search a card from the library'}
        value={filter}
        block
        onChange={(value) => handleChange(value)}
        readOnly={false}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            dispatch(getEmbedArticles(filter));
          }
        }}
        actionButton={
          <button className="action-button" onClick={() => dispatch(getEmbedArticles(filter))}>
            <GoIcon />
          </button>
        }
      />
    </SearchBarLayout>
  );
}
