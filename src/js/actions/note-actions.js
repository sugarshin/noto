import debounce from 'lodash.debounce';

import dispatcher from '../dispatcher/dispatcher';
import api from '../utils/api';

import { ActionTypes } from '../constants/constants';

const API_PATH = 'notes';
const API_DEBOUNCE_TIME = 1000;

export default class NoteActions {

  constructor() {
    this._debouncedApi = debounce(this._api, API_DEBOUNCE_TIME);
  }

  updateTag(id, tags) {
    dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_TAG,
      id,
      tags
    });

    this._api(id, {tags});
  }

  updateTitle(id, title) {
    dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_TITLE,
      id,
      title
    });

    this._api(id, {title});
  }

  inputText(id, text) {
    dispatcher.dispatch({
      actionType: ActionTypes.INPUT_TEXT,
      id,
      text
    });
    this._debouncedApi(id, {body: text});
  }

  _api(id, updates) {
    api.put(API_PATH, { id, updates });
  }

}
