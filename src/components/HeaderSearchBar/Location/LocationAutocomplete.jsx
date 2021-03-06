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
  const [placeId, setPlaceId] = useState(null);
  const handleChange = async (address) => {
    setAddress(address);
    setPlaceId(null);
  };

  const clearValue = (address) => {
    setAddress('');
    setPlaceId(null);
    props.clearValueAction();
  };
  const { placeholderText = 'Select a location' } = props;

  const handleChangeValidations = async (address, placeId) => {
    setAddress(address);
    props.setPlaceId(placeId, address);
    setPlaceId(placeId);
  };

  return (
    <PlacesAutocompleteContainerLayout>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleChangeValidations}
        debounce={300}
        shouldFetchSuggestions={address && address.length > 1}
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
                {address && address.length > 0 ? (
                  <IoIosClose onClick={clearValue} className="clear-element" size={30} />
                ) : null}
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

                  {!placeId && address !== 'Worldwide' ? (
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
    </PlacesAutocompleteContainerLayout>
  );
}
