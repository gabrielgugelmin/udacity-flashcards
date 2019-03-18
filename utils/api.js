import { AsyncStorage } from 'react-native';

const DECK_LIST = 'DECK_LIST';

/**
 * Store Data
 * @param  {Array|Object} newValue new array/object to store in database
 * @return {Function}              callback
 */
const storeData = (newValue, callback = function () {} ) => {
  AsyncStorage.setItem(DECK_LIST, JSON.stringify(newValue)).then(error => {
    AsyncStorage.getItem(DECK_LIST).then(data => callback(data));
  });
}

/**
 * Fetch Data
 * @return {Function} callback
 */
const fetchData = (callback = function () {} ) => {
  AsyncStorage.getItem(DECK_LIST).then(data => callback(data));
}

export { storeData, fetchData }