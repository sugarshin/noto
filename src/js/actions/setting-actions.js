import co from 'co';
import debounce from 'lodash.debounce';

import dispatcher from '../dispatcher/dispatcher';
import settingsAPI from '../utils/settings-api';

import ActionTypes from '../constants/ActionTypes';

const API_DEBOUNCE_TIME = 1000;
const debouncedSettingsAPIPUT = debounce(settingsAPI.put, API_DEBOUNCE_TIME);

export default class SettingActions {

  fetch() {
    co(function* fetch() {
      try {
        const data = yield settingsAPI.fetch();

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

    debouncedSettingsAPIPUT({color});
  }

  changeTextSize(size) {
    dispatcher.dispatch({
      actionType: ActionTypes.CHANGE_TEXT_SIZE,
      size
    });

    debouncedSettingsAPIPUT({size});
  }

  changeBackgroundColor(backgroundColor) {
    dispatcher.dispatch({
      actionType: ActionTypes.CHANGE_BACKGROUND_COLOR,
      backgroundColor
    });

    debouncedSettingsAPIPUT({backgroundColor});
  }

  reset(updates) {
    dispatcher.dispatch({
      actionType: ActionTypes.RESET_SETTINGS,
      updates
    });

    debouncedSettingsAPIPUT(updates);
  }

  changeIsOpenSetting(isOpenSetting) {
    dispatcher.dispatch({
      actionType: ActionTypes.CHANGE_OPEN_SETTINGS,
      isOpenSetting
    });
  }

}
