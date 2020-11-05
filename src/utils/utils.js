import { optionsLocationsAllowed } from './constants';
import _ from 'lodash';
export const suggestionsFilter = (suggestions) => {
  const filteredSuggestion = suggestions.filter((suggestion) => {
    const locationTypes = suggestion.types;
    const existInArray = _.intersectionBy(optionsLocationsAllowed, locationTypes);
    if (existInArray.length > 0) {
      return suggestion;
    } else {
      return false
    }
  });
  return filteredSuggestion;
};

export const getPlaceHolderText = (field) => `${field.placeholder}${field.required ? '*' : ''}`;

export const getCatId = (categories, catName) => {
  const { _id } = categories.filter((cat) => cat.name === catName)[0];
  return _id;
};

export const getDateFormatted = (rawDate) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = new Date(rawDate);
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const dateFormatted = months[date.getMonth()] + ' ' + day + ', ' + date.getFullYear();
  return dateFormatted;
};
