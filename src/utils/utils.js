import { optionsLocationsAllowed } from './constants';
import _ from 'lodash';
export const suggestionsFilter = (suggestions) => {
  const filteredSuggestion = suggestions.filter((suggestion) => {
    const locationTypes = suggestion.types;
    const existInArray = _.intersectionBy(optionsLocationsAllowed, locationTypes);
    if (existInArray.length > 0) {
      return suggestion;
    }
  });
  return filteredSuggestion;
};

export const getPlaceHolderText = (field) => `${field.placeholder}${field.required ? '*' : ''}`;
