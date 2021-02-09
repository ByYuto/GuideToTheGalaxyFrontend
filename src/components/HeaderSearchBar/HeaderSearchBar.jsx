import React, { useCallback, useEffect, useMemo } from 'react';
import LocationAutoComplete from './Location/LocationAutocomplete';
import Autocomplete from '../UI/autocomplete/Autocomplete';
import { ThemeProvider } from 'styled-components';
import Select from 'react-select';
import { HeaderSearchBarLayout, customStyle, SearchInputsContainer } from './styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  onSearchValueChange,
  getCategories,
  setCategoryValue,
  setPlaceId,
  //getArticlesFiltered,
  getSearchSuggestion,
  getArticlesFiltered,
  getArticles,
  setSelectedKeyword,
  setSelectedKeywords,
  //getArticles,
} from '../../redux/reducers/topbarSearch';
import { SearchIcon, GoIcon } from '../../assets/icons/svg-icons';
import { useHistory, useLocation } from 'react-router-dom';
import { startCase } from 'lodash';
import { useState } from 'react';

export default function HeaderSearchBar() {
  //console.log('************ start rendering header search bar ***************');
  const { searchValue, locationValue, locationName, searchSuggestions, categoryValue, keywordsSelected } = useSelector(
    (store) => store.topbarSearch
  );
  const keywordsSelectedValue = keywordsSelected.join(',');

  let { categoriesList } = useSelector((store) => store.topbarSearch);
  categoriesList = categoriesList.map((category) => ({
    ...category,
    label: startCase(category.label.toLowerCase()),
  }));
  //const { articles } = useSelector((store) => store.articles);
  const [firstRender, setFirstRender] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const isHome = location.pathname === '/';
  const isSearch = location.pathname === '/search';

  const searchParam = params.get('search') || '';
  const locationParam = params.get('location') || '';
  const categoryParam = params.get('category') || '';
  const keywordsParam = params.get('keywords') || '';
  //console.log('CurrentLocation is', location);
  //console.log('UrlParams', { searchParam, locationParam, categoryParam, keywordsParam });
  //console.log('Values in Store', { searchValue, locationValue, categoryValue, keywordsSelectedValue });

  const handleSearchChange = (e) => {
    dispatch(onSearchValueChange(e.target.value));
  };
  const handleClearSearch = (e) => {
    updateSearchURL('');
  };
  const handleSearchSelection = (val) => {
    dispatch(onSearchValueChange(val));
  };
  const updateSearchURL = useCallback(
    (forceSearchValue) => {
      //console.log('Calling a updateSearchURL', { searchValue, locationValue, categoryValue, keywordsSelectedValue });
      let params = new URLSearchParams();
      let searchParam = forceSearchValue !== undefined ? forceSearchValue : searchValue;
      if (searchParam) {
        params.set('search', searchParam);
      }
      if (locationValue) {
        params.set('location', locationValue);
      }
      if (categoryValue) {
        params.set('category', categoryValue);
      }
      if (keywordsSelectedValue) {
        params.set('keywords', keywordsSelectedValue);
      }

      if (!isHome && !isSearch) {
        return;
      }

      const strParams = params.toString();
      const newURL = (isHome ? '/' : '/search') + (strParams ? `?${strParams}` : '');
      //console.log('Changing URL to', newURL);

      history.push(newURL);
    },
    [locationValue, categoryValue, keywordsSelectedValue, isHome, history]
  );
  useEffect(() => {
    // console.log('Ejecutando Efecto para setear estado desde los parametros de la URL', {
    //   searchParam,
    //   locationParam,
    //   categoryParam,
    //   keywordsParam,
    // });

    if (searchParam !== searchValue) {
      //console.log('SearchValues are different', searchParam, searchValue);
      dispatch(onSearchValueChange(searchParam));
    }
    if (locationParam !== locationValue) {
      //console.log('LocationValues are different', locationParam, locationValue);
      dispatch(setPlaceId(locationParam));
    }
    if (categoryParam !== categoryValue) {
      //console.log('CategoryValues are different', categoryParam, categoryValue);
      dispatch(setCategoryValue(categoryParam));
    }
    if (keywordsParam !== keywordsSelectedValue) {
      const keywordsInParams = keywordsParam.split(',');
      dispatch(setSelectedKeywords(keywordsInParams));
    }

    dispatch(getArticlesFiltered(searchParam, locationParam, categoryParam, keywordsParam));
  }, [dispatch, searchParam, locationParam, categoryParam, keywordsParam]);

  useEffect(() => {
    if (!firstRender) {
      // console.log('Executing updateURL effect because store values changed', {
      //   locationValue,
      //   categoryValue,
      //   keywordsSelectedValue,
      //   updateSearchURL,
      // });
      updateSearchURL();
    }
    setFirstRender(false);
  }, [locationValue, categoryValue, keywordsSelectedValue, firstRender, setFirstRender, updateSearchURL]);

  //Load Categories if not loaded
  useEffect(() => {
    //console.log('Executing effect to load categories if not loaded', categoriesList.length);
    if (!categoriesList.length) {
      //console.log('No hay categorias, cargando...');
      dispatch(getCategories());
    }
  }, [dispatch, categoriesList.length]);

  //Update Search "Suggestions"
  useEffect(() => {
    let timeout = null;
    if (searchValue && searchValue.length > 2) {
      timeout = setTimeout(() => {
        dispatch(
          getSearchSuggestion(searchValue || '', locationValue || '', categoryValue || '', keywordsSelectedValue)
        );
      }, 300);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [searchValue, dispatch]);

  return (
    <ThemeProvider theme={{ isDark: true }}>
      <HeaderSearchBarLayout actionButton={searchValue.length > 0 ? 1 : 0}>
        <SearchInputsContainer justify="center" elmWidth="100%" smCol>
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
                updateSearchURL(searchValue);
              }
            }}
            actionButton={
              searchValue.length > 0 ? (
                <button className="action-button" onClick={() => updateSearchURL(searchValue)}>
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
            options={[
              { label: categoriesList && categoriesList.length ? 'All categories' : 'Loading...', value: '' },
              ...categoriesList,
            ]}
            styles={customStyle}
            placeholder="All categories"
            className="select-category"
            classNamePrefix="category"
            isSearchable={false}
            onChange={(val) => {
              dispatch(setCategoryValue(val.value));
            }}
            //defaultValue={categoriesList.filter((c) => c.value === categoryValue)}
            value={categoriesList.filter((c) => c.value === categoryValue)}
          />
        </SearchInputsContainer>
      </HeaderSearchBarLayout>
    </ThemeProvider>
  );
}
