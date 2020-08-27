import React, { useState } from 'react';
import Input from '../Input';
import { SearchBarLayout } from './styledComponents';
import { SearchIcon, GoIcon } from '../../../assets/icons/svg-icons';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [focus, setFocus] = useState(false);
  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);
  return (
    <SearchBarLayout focused={focus}>
      <Input
        leftIcon={
          <>
            <SearchIcon className="icon-search" />
          </>
        }
        placeholder={'Search a card from the library'}
        value={searchValue}
        block
        onChange={(value) => setSearchValue(value)}
        readOnly={false}
        onBlur={handleBlur}
        onFocus={handleFocus}
        autoCompleteOptions={['option 1', 'option 2']}
        actionButton={
          <button className="action-button">
            <GoIcon />
          </button>
        }
      />
    </SearchBarLayout>
  );
}
