import co from 'co';
import debounce from 'lodash.debounce';

import dispatcher from '../dispatcher/dispatcher';
import api from '../utils/api';

import { INITIAL_STORE } from '../constants/constants';
import ActionTypes from '../constants/ActionTypes';

const API_PATH = 'settings';
const API_DEBOUNCE_TIME = 1000;

export default class SettingActions {

  constructor() {
    this._debouncedApi = debounce(this._api, API_DEBOUNCE_TIME);
  }

  fetch() {
    co(function* __fetch__() {
      try {
        const data = yield api.fetch(API_PATH);

        dispatcher.dispatch({
          actionType: ActionTypes.FETCH_SETTINGS,
          data
        });
      } catch (err) {
        console.log('SettingActions#fetch:\n', err);
      }
    });
  }

  changeTextColor(color) {
    dispatcher.dispatch({
      actionType: ActionTypes.CHANGE_TEXT_COLOR,
      color
    });

    this._debouncedApi({ updates: {color} });
  }

  changeTextSize(size) {
    dispatcher.dispatch({
      actionType: ActionTypes.CHANGE_TEXT_SIZE,
      size
    });

    this._debouncedApi({ updates: {size} });
  }

  changeBackgroundColor(backgroundColor) {
    dispatcher.dispatch({
      actionType: ActionTypes.CHANGE_BACKGROUND_COLOR,
      backgroundColor
    });

    this._debouncedApi({ updates: {backgroundColor} });
  }

  reset() {
    const { settings } = INITIAL_STORE;

    dispatcher.dispatch({
      actionType: ActionTypes.RESET_SETTINGS,
      data: settings
    });

    this._debouncedApi({ updates: settings });
  }

  _api(data) {
    api.put(API_PATH, data);
  }

}
