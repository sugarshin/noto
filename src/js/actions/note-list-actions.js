import crypto from 'crypto';
import co from 'co';

import dispatcher from '../dispatcher/dispatcher';
import api from '../utils/api';

import { ActionTypes } from '../constants/constants';

const {
  FETCH_NOTES,
  CREATE_NOTE,
  TRASH_NOTE,
  RESTORE_NOTE,
  DESTROY_NOTE
} = ActionTypes;

const API_PATH = 'notes';

export default class NoteListActions {

  fetch() {
    return co(function* __fetch__() {
      const notes = yield api.fetch(API_PATH);
      dispatcher.dispatch({
        actionType: FETCH_NOTES,
        notes
      });
    })
    .catch(err => console.log('NoteListActions#fetch:\n', err));
  }

  createNote(note) {
    note.id = crypto.randomBytes(16).toString('hex');

    dispatcher.dispatch({
      actionType: CREATE_NOTE,
      note
    });

    api.post(API_PATH, note);
  }

  trashNote(id) {
    dispatcher.dispatch({
      actionType: TRASH_NOTE,
      id
    });

    api.put(API_PATH, { id, updates: {trashed: true} });
  }

  restoreNote(id) {
    dispatcher.dispatch({
      actionType: RESTORE_NOTE,
      id
    });

    api.put(API_PATH, { id, updates: {trashed: false} });
  }

  destroyNote(id) {
    dispatcher.dispatch({
      actionType: DESTROY_NOTE,
      id
    });

    api.delete(API_PATH, id);
  }

}
