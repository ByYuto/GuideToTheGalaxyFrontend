import React, { useCallback, useEffect } from 'react';
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
  //getArticles,
} from '../../redux/reducers/topbarSearch';
import { SearchIcon, GoIcon } from '../../assets/icons/svg-icons';
import { useHistory, useLocation } from 'react-router-dom';
import { startCase } from 'lodash';

export default function HeaderSearchBar() {
  const { searchValue, locationValue, locationName, searchSuggestions, categoryValue, keywordsSelected } = useSelector(
    (store) => store.topbarSearch
  );
  let { categoriesList } = useSelector((store) => store.topbarSearch);
  categoriesList = categoriesList.map((category) => ({
    ...category,
    label: startCase(category.label.toLowerCase()),
  }));
  //const { articles } = useSelector((store) => store.articles);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const isSearch = location.pathname === '/search';
  const searchParam = params.get('search') || '';
  const locationParam = params.get('location') || '';
  const categoryParam = params.get('category') || '';
  const keywordsParam = params.get('keywords') || '';

  const keywordsSelectedValue = keywordsSelected.join(',');
  const handleSearchChange = (e) => {
    console.log('Cambiado por aqui 2');
    dispatch(onSearchValueChange(e.target.value));
  };
  const handleClearSearch = (e) => {
    console.log('Limpiado el valor');
    updateSearchURL('');
  };
  const handleSearchSelection = (val) => {
    console.log('Cambiado por aqui 3');
    dispatch(onSearchValueChange(val));
  };
  const updateSearchURL = useCallback(
    (forceSearchValue) => {
      let params = new URLSearchParams();
      let searchParam = forceSearchValue !== undefined ? forceSearchValue : searchValue;
      if (searchParam) {
        params.set('search', searchParam);
      }

      if (locationValue) {
        params.set('location', locationValue);
      }
      console.log({ categoryValue });
      if (categoryValue) {
        params.set('category', categoryValue);
      }
      if (keywordsSelectedValue) {
        params.set('keywords', keywordsSelectedValue);
      }

      const strParams = params.toString();
      console.log('Seteando URL a ', '/search' + (strParams ? `?${strParams}` : ''));
      history.push('/search' + (strParams ? `?${strParams}` : ''));
    },
    [searchValue, locationValue, categoryValue, keywordsSelectedValue, history]
  );

  //Load Categories if not loaded
  useEffect(() => {
    if (categoriesList.length < 1) {
      console.log('No hay categorias, cargando...');
      dispatch(getCategories());
    }
  }, [dispatch, categoriesList.length]);

  //Update Search "Suggestions"
  useEffect(() => {
    let timeout = null;
    if (searchValue && searchValue.length > 2) {
      timeout = setTimeout(() => {
        console.log('Actualizando sugerencias de busqueda');
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
  }, [searchValue, locationValue, categoryValue, keywordsSelectedValue, dispatch]);

  
  useEffect(() => {
    if (isSearch && (locationValue || categoryValue || keywordsSelectedValue)) {
      updateSearchURL();
    }
  }, [isSearch, locationValue, categoryValue, keywordsSelectedValue, updateSearchURL]);
  

  useEffect(() => {
    console.log('Ejecutando Efecto1');
    if (isSearch) {
      console.log('IsSearch', isSearch);
      //if (searchParam || locationParam || categoryParam || keywordsParam) {
      //console.log('Hay parametros, modificando estado y consultando');
      dispatch(onSearchValueChange(searchParam));
      dispatch(setPlaceId(locationParam));
      dispatch(setCategoryValue(categoryParam));
      //if(keywordsParam){}
      dispatch(getArticlesFiltered(searchParam, locationParam, categoryParam, keywordsParam));
    }
    //}
    //if(!$search)
  }, [dispatch, searchParam, locationParam, categoryParam, keywordsParam, isSearch]);

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
                updateSearchURL();
              }
            }}
            actionButton={
              searchValue.length > 0 ? (
                <button className="action-button" onClick={() => updateSearchURL()}>
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
