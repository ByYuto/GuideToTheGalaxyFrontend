import React, { useEffect } from 'react';
import LocationAutoComplete from './Location/LocationAutocomplete';
import FlexContainer from '../UI/FlexContainer';
import Autocomplete from '../UI/autocomplete/Autocomplete';
import { ThemeProvider } from 'styled-components';
import Select from 'react-select';
import { HeaderSearchBarLayout, customStyle } from './styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  onSearchValueChange,
  clearSearchValue,
  getCategories,
  setCategoryValue,
  setPlaceId,
  getArticlesFiltered,
  getSearchSuggestion,
} from '../../redux/reducers/topbarSearch';
import { SearchIcon, GoIcon } from '../../assets/icons/svg-icons';
import { useHistory, useParams } from 'react-router-dom';

export default function HeaderSearchBar() {
  const {
    searchValue,
    locationValue,
    locationName,
    searchSuggestions,
    categoriesList,
    categoryValue,
    keywordsSelected,
  } = useSelector((store) => store.topbarSearch);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const handleSearchChange = (e) => {
    dispatch(onSearchValueChange(e.target.value));
  };
  const handleClearSearch = (e) => {
    dispatch(clearSearchValue());
  };
  const handleSearchSelection = (val) => {
    dispatch(onSearchValueChange(val));
  };
  const handleSearchArticles = () => {
    saveLatestSearches(searchValue);
    dispatch(getArticlesFiltered(searchValue, locationValue, categoryValue, keywordsSelected.join(',')));
    let params = '';
    if (searchValue.length > 0) {
      params += `?search=${searchValue}`;
    }

    if (locationValue.length > 0) {
      params += `&location=${locationValue}`;
    }
    if (categoryValue.length > 0) {
      params += `&category=${categoryValue}`;
    }

    history.push('/search' + params);
  };

  const saveLatestSearches = (value) => {
    const currentSaved = window.localStorage.getItem('latestSearches');
    const currentSavedArr = currentSaved ? JSON.parse(currentSaved) : [];
    const filteredCurrentSaved = currentSavedArr.filter((v) => v.description !== value);
    const newSavedArr =
      currentSavedArr.length > 2
        ? [{ active: false, description: value }, ...filteredCurrentSaved.slice(0, 2)]
        : [{ active: false, description: value }, ...filteredCurrentSaved];
    window.localStorage.setItem('latestSearches', JSON.stringify(newSavedArr));
  };

  useEffect(() => {
    console.log(params);
    if (categoriesList.length < 1) {
      dispatch(getCategories());
    }
    if (searchValue.length > 4) {
      setTimeout(() => dispatch(getSearchSuggestion(searchValue)), 500);
    }
    if (locationValue.length > 0 || categoryValue.length > 0) {
      setTimeout(
        () => dispatch(getArticlesFiltered(searchValue, locationValue, categoryValue, keywordsSelected.join(','))),
        700
      );
    }
  }, [searchValue, locationValue, categoryValue, keywordsSelected.length]);

  const getAllSearchOptions = () => {
    const recentSearches = JSON.parse(window.localStorage.getItem('latestSearches'));
    const searches = recentSearches ? recentSearches : [];
    return [...searches, ...searchSuggestions];
  };
  return (
    <ThemeProvider theme={{ isDark: true }}>
      <HeaderSearchBarLayout actionButton={searchValue.length > 0 ? 1 : 0}>
        <FlexContainer className="search-inputs-container" justify="center" elmWidth="100%" smCol>
          <Autocomplete
            value={searchValue}
            onChange={handleSearchChange}
            onClearValue={handleClearSearch}
            icon={<SearchIcon className="location-icon" />}
            suggestions={getAllSearchOptions()}
            onOptionSelect={handleSearchSelection}
            placeholder="Search the guide"
            className={'search-autocomplete'}
            handleKeydown={(e) => {
              if (e.keyCode === 13) {
                e.preventDefault();
                handleSearchArticles();
              }
            }}
            actionButton={
              searchValue.length > 0 ? (
                <button className="action-button" onClick={() => handleSearchArticles()}>
                  <GoIcon />
                </button>
              ) : null
            }
          />
          <LocationAutoComplete
            setPlaceId={(val, addr) => {
              dispatch(setPlaceId(val, addr));
            }}
            value={locationName}
          />
          <Select
            options={[{ label: 'All categories', value: '' }, ...categoriesList]}
            styles={customStyle}
            placeholder="All categories"
            className="select-category"
            classNamePrefix="category"
            isSearchable={false}
            onChange={(val) => dispatch(setCategoryValue(val.value))}
            defaultValue={categoriesList.filter((c) => c.value === categoryValue)}
          />
        </FlexContainer>
      </HeaderSearchBarLayout>
    </ThemeProvider>
  );
}
