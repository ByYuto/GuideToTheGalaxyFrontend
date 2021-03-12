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
  setSelectedKeywords,
  setSort,
  //getArticles,
} from '../../redux/reducers/topbarSearch';
import { SearchIcon, GoIcon } from '../../assets/icons/svg-icons';
import { useHistory, useLocation } from 'react-router-dom';
import { startCase } from 'lodash';
import { useState } from 'react';

export default function HeaderSearchBar() {
  //console.log('************ start rendering header search bar ***************');
  const {
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

  const params = new URLSearchParams(location.search);
  const isHome = location.pathname === '/';
  const isSearch = location.pathname === '/search';

  const searchParam = params.get('search') || '';
  const locationParam = params.get('location') || '';
  const categoryParam = params.get('category') || '';
  const keywordsParam = params.get('keywords') || '';
  const sortParam = params.get('sort') || '';
  //console.log('CurrentLocation is', location);
  //console.log('UrlParams', { searchParam, locationParam, categoryParam, keywordsParam });
  //console.log('Values in Store', { searchValue, locationValue, categoryValue, keywordsSelectedValue });

  const handleSearchChange = (e) => {
    dispatch(onSearchValueChange(e.target.value));
  };
  const handleClearSearch = (e) => {
    dispatch(onSearchValueChange(''));
    updateSearchURL({ searchValue: '' });
    dispatch(getArticlesFiltered('', locationValue, categoryValue, keywordsSelectedValue));
  };
  const handleSearchSelection = (val) => {
    dispatch(onSearchValueChange(val));
  };
  console.log({ keywordsSelectedValue });
  const updateSearchURL = useCallback(
    (forcedValues = {}) => {
      console.log('Starting updateSearchURL callback');
      let params = new URLSearchParams();
      const search = forcedValues.searchValue !== undefined ? forcedValues.searchValue : searchValue;
      const location = forcedValues.locationValue !== undefined ? forcedValues.locationValue : locationValue;
      const category = forcedValues.categoryValue !== undefined ? forcedValues.categoryValue : categoryValue;
      const sort = forcedValues.sortValue !== undefined ? forcedValues.sortValue : sortValue;
      const keywordsSelected =
        forcedValues.keywordsSelectedValue !== undefined ? forcedValues.keywordsSelectedValue : keywordsSelectedValue;

      console.log('Calling a updateSearchURL', {
        searchParam,
        locationValue,
        categoryValue,
        keywordsSelected,
        sort,
      });
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

      console.log('initialized', initialized);
      if (!initialized) {
        console.log('No está inicializado, ignorando cambio de url');
        return;
      }

      const strParams = params.toString();
      const newURL = (isHome ? '/' : '/search') + (strParams ? `?${strParams}` : '');
      console.log('Changing URL to', newURL);

      history.push(newURL);
    },
    [locationValue, categoryValue, keywordsSelectedValue, isHome, history, initialized, sortValue]
  );

  useEffect(() => {
    updateSearchURL();
  }, [keywordsSelectedValue, locationValue, categoryValue, sortValue, updateSearchURL]);
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
    if (initialized) {
      //console.log('Executing updateURL effect because store values changed', {
      //  searchValue,
      //  locationValue,
      //  categoryValue,
      //  keywordsSelectedValue,
      //  initialized,
      //});
      console.log('Actualizando Busqueda porque cambio un parametro');
      dispatch(getArticlesFiltered(searchParam, locationValue, categoryValue, sortValue, keywordsSelectedValue));
    } else {
      console.log('Aun no está inicializado... esperando...');
    }
  }, [locationValue, categoryValue, sortValue, keywordsSelectedValue, initialized, dispatch]);

  useEffect(() => {
    /*console.log(
      'Ejecutando Efecto para setear estado desde los parametros de la URL, algo cambio en estos parametros',
      {
        searchParam,
        locationParam,
        categoryParam,
        keywordsParam,
      }
    );*/

    if (!isHome && !isSearch) {
      return;
    }

    const keywordsInParams = keywordsParam ? keywordsParam.split(',') : '';
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

  useEffect(() => {
    //console.log('Seteando initialized = true');
    setInitialized(true);
  }, []);

  useEffect(() => {
    //console.log('Pasó por aqui, ahora initialized vale', initialized);
  }, [initialized]);
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
                dispatch(getArticlesFiltered(searchValue, locationValue, categoryValue, keywordsSelectedValue));
                updateSearchURL({ searchValue });
              }
            }}
            actionButton={
              //searchValue.length > 0 ? (
              <button
                className="action-button"
                onClick={() => {
                  updateSearchURL({ searchValue });
                  dispatch(getArticlesFiltered(searchValue, locationValue, categoryValue, keywordsSelectedValue));
                }}
              >
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
