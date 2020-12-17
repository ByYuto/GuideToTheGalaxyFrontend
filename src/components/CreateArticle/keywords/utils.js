import _ from 'lodash';


export const buildKeywordsArr = (available, selected) => {
    const availableFiltered = _.difference(available, selected);
    return availableFiltered;
};