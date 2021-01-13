import React, { useState, useEffect } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { suggestionsFilter, getPlaceHolderText } from '../../../utils/utils';
import { isRequired } from '../../../utils/validations';
import SuggestionOptions from './SuggestionsOptions';
import { AutocompleteLayout, PlacesAutocompleteContainerLayout } from './styled-components';
import { IoIosClose } from 'react-icons/io';
import { BlueLocationIcon } from '../../../assets/icons/svg-icons';
import { StyledFieldTooltip } from '../../../views/CreateArticle/StyledComponents';
import { TextValidation } from '../../UI/forms/styledComponents';
import { useDispatch } from 'react-redux';
import { validateField } from '../../../redux/reducers/newArticleState';

export default function LocationAutocomplete(props) {
  const [address, setAddress] = useState('');
  const [placeId, setPlaceId] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [isGoogleReady, setIsGoogleReady] = useState(false);

  console.log('rendering', placeId);
  const dispatch = useDispatch();

  const handleChange = async (address) => {
    console.log('handleChange', placeId);
    if (validate && validations) {
      const validationsUpdate = dataType.required ? [isRequired, ...validations] : validations;
      const isValid = validate(placeId, validationsUpdate);
      const fieldValidation = {};
      fieldValidation[field] = isValid.length > 0 ? isValid[0] : { valid: true, errorType: '' };
      await dispatch(validateField(fieldValidation));
    }
    setAddress(address);
    setPlaceId(null);
  };

  const clearValue = (address) => {
    console.log('clearValue', placeId);
    setAddress('');
    setPlaceId(null);
  };
  const { contentType, field, placeholderText, validations, validate, validateError, onChangeData } = props;
  const dataType = contentType[field];
  const tooltip = contentType ? contentType[field]?.tooltip : `${field}`;

  const handleChangeValidations = async (address, placeId) => {
    console.log('handleChangeValidations', placeId);
    if (validate && validations) {
      const validationsUpdate = dataType.required ? [isRequired, ...validations] : validations;
      const isValid = validate(placeId, validationsUpdate);
      const fieldValidation = {};
      fieldValidation[field] = isValid.length > 0 ? isValid[0] : { valid: true, errorType: '' };
      await dispatch(validateField(fieldValidation));
    }
    setAddress(address);
    setPlaceId(placeId);
    return onChangeData(field, placeId);
  };
  useEffect(() => {
    const loadGoogleMaps = (callback) => {
      const existingScript = document.getElementById('googlePlaces');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_CLIENT_PLACES_KEY}&libraries=places`;
        script.id = 'googlePlaces';
        document.body.appendChild(script);
        script.onload = () => {
          if (callback) callback();
        };
      }
      if (existingScript && callback) callback();
    };
    loadGoogleMaps(() => setIsGoogleReady(true));
  }, []);
  return (
    isGoogleReady && (
      <PlacesAutocompleteContainerLayout>
        <PlacesAutocomplete
          value={address}
          onChange={handleChange}
          onSelect={handleChangeValidations}
          debounce={500}
          shouldFetchSuggestions={address.length > 1}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
            const filteredSuggestions = suggestionsFilter(suggestions);
            return (
              <AutocompleteLayout>
                <div className="input-autocomplete-container">
                  <BlueLocationIcon className="location-icon" />
                  <input
                    {...getInputProps({
                      placeholder: contentType ? getPlaceHolderText(contentType[field]) : placeholderText,
                      className: 'location-search-input',
                    })}
                    onFocus={() => setTooltipVisible(true)}
                    onBlur={() => setTooltipVisible(false)}
                  />
                  {address.length > 0 ? <IoIosClose onClick={clearValue} className="clear-element" size={30} /> : null}
                </div>
                {tooltipVisible ? (
                  <div className="autocomplete-dropdown-container">
                    {filteredSuggestions.map((suggestion, index) => (
                      <SuggestionOptions
                        key={index}
                        suggestion={suggestion}
                        getSuggestionItemProps={getSuggestionItemProps}
                      />
                    ))}
                    {placeId === null && !dataType.required ? (
                      <SuggestionOptions
                        getSuggestionItemProps={getSuggestionItemProps}
                        suggestion={{ active: false, description: 'Worldwide', placeId: '' }}
                      />
                    ) : null}
                  </div>
                ) : null}
              </AutocompleteLayout>
            );
          }}
        </PlacesAutocomplete>
        {!validateError?.valid && validateError?.errorType && (
          <TextValidation className="validation-message">{validateError?.errorType}</TextValidation>
        )}
        {tooltipVisible && tooltip && <StyledFieldTooltip>{tooltip}</StyledFieldTooltip>}
      </PlacesAutocompleteContainerLayout>
    )
  );
}
