import React, { useState, useEffect } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { suggestionsFilter } from '../../../utils/utils';
import SuggestionOptions from './SuggestionsOptions';
import { AutocompleteLayout, PlacesAutocompleteContainerLayout } from './styled-components';
import { IoIosClose } from 'react-icons/io';
import { BlueLocationIcon } from '../../../assets/icons/svg-icons';

export default function LocationAutocomplete(props) {
  const [address, setAddress] = useState(props.value);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [isGoogleReady, setIsGoogleReady] = useState(false);
  const handleChange = async (address) => {
    setAddress(address);
  };

  const clearValue = (address) => {
    setAddress('');
    props.clearValueAction();
  };
  const { placeholderText = 'Select a location' } = props;

  const handleChangeValidations = async (address, placeId) => {
    setAddress(address);
    props.setPlaceId(placeId, address);
  };

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

  useEffect(() => {
    loadGoogleMaps(() => setIsGoogleReady(true));
  }, []);

  return (
    isGoogleReady && (
      <PlacesAutocompleteContainerLayout>
        <PlacesAutocomplete
          value={address}
          onChange={handleChange}
          onSelect={handleChangeValidations}
          debounce={300}
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
                      placeholder: placeholderText,
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

                    <SuggestionOptions
                      getSuggestionItemProps={getSuggestionItemProps}
                      suggestion={{ active: false, description: 'Worldwide', placeId: '' }}
                    />
                  </div>
                ) : null}
              </AutocompleteLayout>
            );
          }}
        </PlacesAutocomplete>
      </PlacesAutocompleteContainerLayout>
    )
  );
}
