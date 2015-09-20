import co from 'co';
import debounce from 'lodash.debounce';

import dispatcher from '../dispatcher/dispatcher';
import api from '../utils/api';

import { INITIAL_STORE } from '../constants/constants';
import ActionTypes from '../constants/ActionTypes';
import { SETTINGS_API_PATH } from '../constants/constants';

const API_DEBOUNCE_TIME = 1000;

export default class SettingActions {

  constructor() {
    this._debouncedApi = debounce(this._api, API_DEBOUNCE_TIME);
  }

  fetch() {
    co(function* fetch() {
      try {
        const data = yield api.fetch(SETTINGS_API_PATH);

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

  reset(updates) {
    dispatcher.dispatch({
      actionType: ActionTypes.RESET_SETTINGS,
      updates
    });

    this._debouncedApi({ updates });
  }

  changeIsOpenSetting(isOpenSetting) {
    dispatcher.dispatch({
      actionType: ActionTypes.CHANGE_OPEN_SETTINGS,
      isOpenSetting
    });
  }

  _api(data) {
    api.put(SETTINGS_API_PATH, data);
  }

}
