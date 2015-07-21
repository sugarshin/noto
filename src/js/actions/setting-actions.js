import co from 'co';
import debounce from 'lodash.debounce';

import dispatcher from '../dispatcher/dispatcher';
import api from '../utils/api';

import { ActionTypes, DEFAULT_STATE } from '../constants/constants';

const {
  FETCH_SETTINGS,
  CHANGE_TEXT_COLOR,
  CHANGE_TEXT_SIZE,
  CHANGE_BACKGROUND_COLOR,
  RESET_SETTINGS
} = ActionTypes;

const API_PATH = 'settings';
const API_DEBOUNCE_TIME = 1000;

export default class SettingActions {

  constructor() {
    this._debouncedApi = debounce(this._api, API_DEBOUNCE_TIME);
  }

  fetch() {
    return co(function* _fetch_() {
      const data = yield api.fetch(API_PATH);

      dispatcher.dispatch({
        actionType: FETCH_SETTINGS,
        data
      });
    })
    .catch(err => console.log('SettingActions#fetch:\n', err));
  }

  changeTextColor(color) {
    dispatcher.dispatch({
      actionType: CHANGE_TEXT_COLOR,
      color
    });

    this._debouncedApi({ updates: {color} });
  }

  changeTextSize(size) {
    dispatcher.dispatch({
      actionType: CHANGE_TEXT_SIZE,
      size
    });

    this._debouncedApi({ updates: {size} });
  }

  changeBackgroundColor(backgroundColor) {
    dispatcher.dispatch({
      actionType: CHANGE_BACKGROUND_COLOR,
      backgroundColor
    });

    this._debouncedApi({ updates: {backgroundColor} });
  }

  reset() {
    const { settings } = DEFAULT_STATE;

    dispatcher.dispatch({
      actionType: RESET_SETTINGS,
      data: settings
    });

    this._debouncedApi({ updates: settings });
  }

  _api(data) {
    api.put(API_PATH, data);
  }

}
