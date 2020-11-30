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
import { useHistory } from 'react-router-dom';
import articles from '../../redux/reducers/articles';

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
  const { articles } = useSelector((store) => store.articles);
  const dispatch = useDispatch();
  const history = useHistory();
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
    if (!searchValue) {
      return;
    }
    let params = '';
    if (searchValue && searchValue.length > 0) {
      params += `?search=${searchValue}`;
    }

    if (locationValue && locationValue.length > 0) {
      params += `&location=${locationValue}`;
    }
    if (categoryValue && categoryValue.length > 0) {
      params += `&category=${categoryValue}`;
    }

    history.push('/search' + params);
  };

  useEffect(() => {
    if (categoriesList.length < 1) {
      dispatch(getCategories());
    }
    if (articles.length < 1) {
      dispatch(
        getArticlesFiltered(searchValue || '', locationValue || '', categoryValue || '', keywordsSelected.join(','))
      );
    }
  }, []);

  useEffect(() => {
    let timeout = null;
    if (searchValue && searchValue.length > 2) {
      timeout = setTimeout(() => {
        dispatch(
          getSearchSuggestion(searchValue || '', locationValue || '', categoryValue || '', keywordsSelected.join(','))
        );
      }, 300);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [searchValue, locationValue, categoryValue, keywordsSelected.join(',')]);

  useEffect(() => {
    let timeout = setTimeout(() => {
      dispatch(
        getArticlesFiltered(searchValue || '', locationValue || '', categoryValue || '', keywordsSelected.join(','))
      );
    }, 300);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [searchValue, locationValue, categoryValue, keywordsSelected.join(',')]);

  return (
    <ThemeProvider theme={{ isDark: true }}>
      <HeaderSearchBarLayout actionButton={searchValue.length > 0 ? 1 : 0}>
        <FlexContainer className="search-inputs-container" justify="center" elmWidth="100%" smCol>
          <Autocomplete
            value={searchValue}
            onChange={handleSearchChange}
            onClearValue={handleClearSearch}
            icon={<SearchIcon className="location-icon" />}
            suggestions={searchSuggestions}
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
            clearValueAction={() => {
              dispatch(setPlaceId('', ''));
            }}
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
