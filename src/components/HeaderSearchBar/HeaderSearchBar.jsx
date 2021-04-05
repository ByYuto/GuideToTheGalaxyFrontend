import React, { useCallback, useEffect, useMemo } from 'react';
import LocationAutoComplete from './Location/LocationAutocomplete';
import Autocomplete from '../UI/autocomplete/Autocomplete';
import { ThemeProvider } from 'styled-components';
import Select from 'react-select';
import { HeaderSearchBarLayout, customStyle, SearchInputsContainer } from './styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSearchValue,
  getCategories,
  setCategoryValue,
  setPlaceId,
  //getArticlesFiltered,
  getSearchSuggestion,
  getArticlesFiltered,
  setSelectedKeywords,
  setSort,
  setTextValue,
  clearTextValue,
  clearSearchValue,
  //getArticles,
} from '../../redux/reducers/topbarSearch';
import { SearchIcon, GoIcon } from '../../assets/icons/svg-icons';
import { useHistory, useLocation } from 'react-router-dom';
import { isEmpty, startCase } from 'lodash';
import { useState } from 'react';

export default function HeaderSearchBar() {
  //console.log('************ start rendering header search bar ***************');

  const {
    textValue,
    searchValue,
    locationValue,
    locationName,
    searchSuggestions,
    categoryValue,
    keywordsSelected,
    sortValue,
  } = useSelector((store) => store.topbarSearch);
  const keywordsSelectedValue = keywordsSelected ? keywordsSelected.join(',') : '';

  let { categoriesList } = useSelector((store) => store.topbarSearch);
  categoriesList = categoriesList.map((category) => ({
    ...category,
    label: startCase(category.label.toLowerCase()),
  }));
  //const { articles } = useSelector((store) => store.articles);
  const [initialized, setInitialized] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isSearch = location.pathname === '/search';

  useEffect(() => {
    if (isHome || isSearch) {
      //Update state from params when initialized
      console.log('Starting Effect - Updating state from URL');
      const params = new URLSearchParams(location.search);

      const searchParam = params.get('search') || '';
      const locationParam = params.get('location') || '';
      const categoryParam = params.get('category') || '';
      const keywordsParam = params.get('keywords') || '';
      const sortParam = params.get('sort') || '';

      const keywordsInParams = keywordsParam ? keywordsParam.split(',') : '';

      //Actualizando estado desde la URL
      if (searchParam) {
        dispatch(setTextValue(searchParam));
        dispatch(setSearchValue(searchParam));
      }

      if (locationParam) {
        dispatch(setPlaceId(locationParam));
      }

      if (categoryParam) {
        dispatch(setCategoryValue(categoryParam));
      }

      if (keywordsInParams && keywordsInParams.length) {
        dispatch(setSelectedKeywords(keywordsInParams));
      }

      if (sortParam) {
        dispatch(setSort(sortParam));
      }
    }
  }, [dispatch, isHome, isSearch, location.search]);

  //console.log('CurrentLocation is', location);
  //console.log('UrlParams', { searchParam, locationParam, categoryParam, keywordsParam });
  //console.log('Values in Store', { searchValue, locationValue, categoryValue, keywordsSelectedValue });

  const handleSearchChange = (e) => {
    dispatch(setTextValue(e.target.value));
  };
  const handleClearSearch = (e) => {
    dispatch(clearTextValue());
    dispatch(clearSearchValue());
  };
  const handleSearchSelection = (val) => {
    dispatch(setSearchValue(val));
  };

  const updateSearchURL = (forcedValues = {}) => {
    console.log('Starting updateSearchURL callback');
    let params = new URLSearchParams();
    const search = forcedValues.searchValue !== undefined ? forcedValues.searchValue : searchValue;
    const location = forcedValues.locationValue !== undefined ? forcedValues.locationValue : locationValue;
    const category = forcedValues.categoryValue !== undefined ? forcedValues.categoryValue : categoryValue;
    const sort = forcedValues.sortValue !== undefined ? forcedValues.sortValue : sortValue;
    const keywordsSelected =
      forcedValues.keywordsSelectedValue !== undefined ? forcedValues.keywordsSelectedValue : keywordsSelectedValue;

    if (search) {
      params.set('search', search);
    }
    if (location) {
      params.set('location', location);
    }
    if (category) {
      params.set('category', category);
    }
    if (keywordsSelected) {
      params.set('keywords', keywordsSelected);
    }
    if (sort) {
      params.set('sort', sort);
    }

    //console.log('initialized', initialized);
    if (!initialized) {
      console.log('No está inicializado, ignorando cambio de url');
      return;
    }

    const strParams = params.toString();
    //if (isHome || isSearch || !isEmpty(forcedValues)) {
    const newURL = (isHome ? '/' : '/search') + (strParams ? `?${strParams}` : '');
    //console.log('Changing URL to', newURL);

    history.push(newURL);
  };

  useEffect(() => {
    console.log('Starting Effect - Update Search URL from state', {
      searchValue,
      locationValue,
      categoryValue,
      sortValue,
      keywordsSelectedValue,
    });
    updateSearchURL();
  }, [searchValue, locationValue, categoryValue, sortValue, keywordsSelectedValue]);
  /*
  useEffect(() => {
    if (initialized) {
      //console.log('Executing updateURL effect because store values changed', {
      //  searchValue,
      //  locationValue,
      //  categoryValue,
      //  keywordsSelectedValue,
      //  initialized,
      //});
      console.log('Ya se inicializó, Actualizando URL con lo que hay en el estado');
      updateSearchURL(searchValue);
    } else {
      console.log('Aun no está inicializado... esperando...');
    }
  }, [locationValue, categoryValue, keywordsSelectedValue, initialized, updateSearchURL]);
  */

  useEffect(() => {
    console.log('Starting Effect - Calling GetArticles');

    //if (initialized) {
    //  searchValue,
    //  locationValue,
    //  categoryValue,
    //  keywordsSelectedValue,
    //  initialized,
    //});
    console.log('Actualizando Busqueda porque cambio un parámetro');
    dispatch(getArticlesFiltered());
    //} else {
    //  console.log('Aun no está inicializado... esperando...');
    //}
  }, [searchValue, locationValue, categoryValue, sortValue, keywordsSelectedValue, initialized, dispatch]);

  /*
  useEffect(() => {
   
    if (!isHome && !isSearch) {
      return;
    }

    const keywordsInParams = keywordsParam ? keywordsParam.split(',') : '';
    if (searchParam !== searchValue) {
      //console.log('SearchValues are different', searchParam, searchValue);
      dispatch(setSearchValue(searchParam));
    }
    if (locationParam !== locationValue) {
      //console.log('LocationValues are different', locationParam, locationValue);
      dispatch(setPlaceId(locationParam));
    }
    if (categoryParam !== categoryValue) {
      //console.log('CategoryValues are different', categoryParam, categoryValue);
      dispatch(setCategoryValue(categoryParam));
    }
    if (sortParam !== sortValue && sortParam !== '') {
      //console.log('Paso por aqui', sortParam);
      //console.log('KeywordsValues are different');
      dispatch(setSort(sortParam));
    }

    if (keywordsParam !== keywordsSelectedValue) {
      //console.log('KeywordsValues are different');
      dispatch(setSelectedKeywords(keywordsInParams));
    }

    //console.log('Ejecutando busqueda', { searchParam, locationParam, categoryParam, keywordsInParams });
    //dispatch(getArticlesFiltered(searchParam, locationParam, categoryParam, keywordsInParams));

    //console.log('Terminó el efecto para setear estado desde los parametros de la URL');
  }, [dispatch, searchParam, locationParam, categoryParam, sortParam, keywordsParam, isHome, isSearch]);
*/
  //Load Categories if not loaded
  useEffect(() => {
    //console.log('Executing effect to load categories if not loaded', categoriesList.length);
    if (!categoriesList.length) {
      //console.log('No hay categorias, cargando...');
      dispatch(getCategories());
    }
  }, [dispatch, categoriesList.length]);

  //Update Search "Suggestions"
  /*
  TODO: Enable this block for suggestions
  useEffect(() => {
    let timeout = null;
    if (textValue && textValue.length > 2) {
      timeout = setTimeout(() => {
        dispatch(getSearchSuggestion());
      }, 300);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [textValue, dispatch]);
  */

  useEffect(() => {
    //console.log('Seteando initialized = true');
    setInitialized(true);
  }, []);

  useEffect(() => {
    //console.log('Pasó por aqui, ahora initialized vale', initialized);
  }, [initialized]);

  const onInputKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      dispatch(setSearchValue(textValue));
      //updateSearchURL({ searchValue });
    }
  };

  const onActionButtonClick = () => {
    //updateSearchURL({ searchValue });
    //dispatch(getArticlesFiltered(searchValue, locationValue, categoryValue, keywordsSelectedValue));
    dispatch(setSearchValue(textValue));
  };

  return (
    <ThemeProvider theme={{ isDark: true }}>
      <HeaderSearchBarLayout actionButton={textValue.length > 0 ? 1 : 0}>
        <SearchInputsContainer justify="center" elmWidth="100%" smCol>
          <Autocomplete
            value={textValue}
            onChange={handleSearchChange}
            onClearValue={handleClearSearch}
            icon={<SearchIcon className="location-icon" />}
            suggestions={searchSuggestions}
            onOptionSelect={handleSearchSelection}
            placeholder="Search the guide"
            className={'search-autocomplete'}
            handleKeydown={onInputKeyDown}
            actionButton={
              //searchValue.length > 0 ? (
              <button className="action-button" onClick={onActionButtonClick}>
                <GoIcon />
              </button>
              //) : null
            }
          />
          <LocationAutoComplete
            setPlaceId={(val, addr) => {
              dispatch(setPlaceId(val, addr));
              updateSearchURL({ locationValue: val });
            }}
            value={locationName}
            clearValueAction={() => {
              dispatch(setPlaceId('', ''));
              updateSearchURL({ locationValue: '' });
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
              updateSearchURL({ categoryValue: val.value });
            }}
            //defaultValue={categoriesList.filter((c) => c.value === categoryValue)}
            value={categoriesList.filter((c) => c.value === categoryValue)}
          />
        </SearchInputsContainer>
      </HeaderSearchBarLayout>
    </ThemeProvider>
  );
}
