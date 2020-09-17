import React from 'react';
import LocationAutoComplete from './Location/LocationAutocomplete';
import FlexContainer from '../UI/FlexContainer';
import Autocomplete from '../UI/autocomplete/Autocomplete';
import { ThemeProvider } from 'styled-components';
import Select from 'react-select';
import { HeaderSearchBarLayout, customStyle } from './styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { onSearchValueChange, clearSearchValue } from '../../redux/reducers/topbarSearch';
import { SearchIcon } from '../../assets/icons/svg-icons';

export default function HeaderSearchBar() {
  const { searchValue, locationValue, searchSuggestions, categories, categoriesSuggestions } = useSelector(
    (store) => store.topbarSearch
  );
  const dispatch = useDispatch();
  const handleSearchChange = (e) => {
    dispatch(onSearchValueChange(e.target.value));
  };
  const handleClearSearch = (e) => {
    dispatch(clearSearchValue());
  };
  const handleSearchSelection = (val) => {
    dispatch(onSearchValueChange(val));
  };
  return (
    <ThemeProvider theme={{ isDark: true }}>
      <HeaderSearchBarLayout>
        <FlexContainer justify="center" elmWidth="100%">
          <Autocomplete
            value={searchValue}
            onChange={handleSearchChange}
            onClearValue={handleClearSearch}
            icon={<SearchIcon className="location-icon" />}
            suggestions={searchSuggestions}
            onOptionSelect={handleSearchSelection}
            placeholder="Search the guide"
            className={'search-autocomplete'}
          />
          <LocationAutoComplete />
          <Select
            options={categoriesSuggestions}
            styles={customStyle}
            placeholder="Select a category"
            className="select-category"
            classNamePrefix="category"
          />
        </FlexContainer>
      </HeaderSearchBarLayout>
    </ThemeProvider>
  );
}
