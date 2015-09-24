import Promise from 'bluebird';
import localforage from 'localforage';
import assign from 'lodash/object/assign';
import cloneDeep from 'lodash/lang/cloneDeep';

import {
  INITIAL_STORE,
  SETTINGS_BACKEND_STORE_NAME,
  SETTINGS_NOTE_CONFIG } from '../constants/constants';

const settingsStore = localforage.createInstance({
  name: SETTINGS_BACKEND_STORE_NAME
});
const initialStoreSettings = cloneDeep(INITIAL_STORE)[SETTINGS_BACKEND_STORE_NAME];

export default class settingsAPI {

  /**
   * fetch
   *
   * GET
   * @return {Promise}
   */
  static fetch() {
    return Promise.resolve()
      .then(() => {
        return settingsStore.getItem(SETTINGS_NOTE_CONFIG);
      })
      .then(settings => {
        if (settings) {
          return settings;
        }

        return initialStoreSettings;
      });
  }

  /**
   * put
   *
   * PUT
   * @param  {Object} updates
   * @return {Promise}
   */
  static put(updates) {
    return Promise.resolve()
      .then(() => {
        return settingsStore.getItem(SETTINGS_NOTE_CONFIG);
      })
      .then(settings => {
        settings = assign({}, settings, updates);
        return settings;
      })
      .then(settings => {
        return settingsStore.setItem(SETTINGS_NOTE_CONFIG, settings);
      });
  }

}
