import debounce from 'lodash/function/debounce';

import dispatcher from '../dispatcher/dispatcher';
import notesAPI from '../utils/notes-api';
import ActionTypes from '../constants/ActionTypes';

const API_DEBOUNCE_TIME = 1000;
const debouncedNotesAPIPUT = debounce(notesAPI.put, API_DEBOUNCE_TIME);

export default class NoteActions {

  updateTag(id, tags) {
    dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_TAG,
      id,
      tags
    });

    debouncedNotesAPIPUT(id, {tags});
  }

  updateTitle(id, title) {
    dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_TITLE,
      id,
      title
    });

    debouncedNotesAPIPUT(id, {title});
  }

  updateBody(id, body) {
    dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_BODY,
      id,
      body
    });
    debouncedNotesAPIPUT(id, {body});
  }

}
