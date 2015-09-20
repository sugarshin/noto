import debounce from 'lodash.debounce';

import dispatcher from '../dispatcher/dispatcher';
import api from '../utils/api';

import ActionTypes from '../constants/ActionTypes';
import { NOTES_API_PATH } from '../constants/constants';

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

  updateBody(id, body) {
    dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_BODY,
      id,
      body
    });
    this._debouncedApi(id, {body});
  }

  _api(id, updates) {
    api.put(NOTES_API_PATH, { id, updates });
  }

}
