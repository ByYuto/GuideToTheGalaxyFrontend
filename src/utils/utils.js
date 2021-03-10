import { optionsLocationsAllowed } from './constants';
import _ from 'lodash';
export const suggestionsFilter = (suggestions) => {
  const filteredSuggestion = suggestions.filter((suggestion) => {
    const locationTypes = suggestion.types;
    const existInArray = _.intersectionBy(optionsLocationsAllowed, locationTypes);
    if (existInArray.length > 0) {
      return suggestion;
    } else {
      return false;
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
  const dateSupportedForSafari = rawDate.replace(/\-/g, '/');
  const date = new Date(dateSupportedForSafari);
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const dateFormatted = months[date.getMonth()] + ' ' + day + ', ' + date.getFullYear();
  return dateFormatted;
};

export const checkKeywordsLettersAllowed = (e) => {
  if (
    (e.keyCode >= 65 && e.keyCode <= 90) || //Uppercase letters
    (e.keyCode >= 97 && e.keyCode <= 122) || //Lowercase letters
    e.keyCode === 32 || //SPACE
    e.keyCode === 8 || //BACKPSPACE
    e.keyCode === 46 || //SUPR/DELETE
    e.keyCode === 37 || //LEFT ARROW
    e.keyCode === 39 || // RIGHT ARROW
    e.keyCode === 35 || // END
    e.keyCode === 36 || // HOME
    e.key === '&' || //Ampersand
    e.key === '-' ||
    e.key === '#'
  ) {
    return true;
  } else {
    return false;
  }
};
