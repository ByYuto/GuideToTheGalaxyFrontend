export const screen = {
  LG: '1920px',
  MD: '1366px',
  SM: '864px',
  XS: '414px',
};

export const optionsLocationsAllowed = [
  'airport',
  'amusement_park',
  'city_hall',
  'courthouse',
  'department_store',
  'museum',
  'park',
  'stadium',
  'subway_station',
  'tourist_attraction',
  'train_station',
  'transit_station',
  'administrative_area_level_1',
  'administrative_area_level_2',
  'administrative_area_level_3',
  'archipelago',
  'country',
  'intersection',
  'locality',
  'natural_feature',
  'neighborhood',
  'point_of_interest',
  'sublocality',
  'sublocality_level_1',
  'town_square',
];

export const generalTemplate = {
  name: 'New Content Type',
  template: 'GENERAL',
  title: {
    placeholder: 'Article title',
    required: true,
    tooltip: 'Article title',
  },
  URL: {
    placeholder: 'Put in a URL to help us verify this post',
    required: true,
    tooltip: 'Put in a URL to help us verify this post',
  },
  location: {
    placeholder: 'Where did they used to busk?',
    required: false,
    tooltip: 'Place a location (optional)',
  },
  date: {
    placeholder: 'Passed date',
    required: false,
    tooltip: 'A tooltip',
  },
  image: {
    placeholder: 'Choose an Image',
    required: false,
    tooltip: 'A tooltip',
  },
};
