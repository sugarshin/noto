import crypto from 'crypto';
import co from 'co';

import dispatcher from '../dispatcher/dispatcher';
import api from '../utils/api';

import ActionTypes from '../constants/ActionTypes';

const API_PATH = 'notes';

export default class NoteListActions {

  fetch() {
    co(function* fetch() {
      try {
        const notes = yield api.fetch(API_PATH);
        dispatcher.dispatch({
          actionType: ActionTypes.FETCH_NOTES,
          notes
        });
      } catch (err) {
        console.log('NoteListActions#fetch:\n', err);
      }
    });
  }

  createNote(note) {
    note.id = crypto.randomBytes(16).toString('hex');

    dispatcher.dispatch({
      actionType: ActionTypes.CREATE_NOTE,
      note
    });

    api.post(API_PATH, note);
  }

  trashNote(id) {
    dispatcher.dispatch({
      actionType: ActionTypes.TRASH_NOTE,
      id
    });

    api.put(API_PATH, { id, updates: {trashed: true} });
  }

  trashCheckedNote(ids) {
    dispatcher.dispatch({
      actionType: ActionTypes.TRASH_CHECKED_NOTE,
      ids
    });

    // TODO
    ids.forEach(id => {
      api.put(API_PATH, { id, updates: {trashed: true} });
    });
  }

  restoreNote(id) {
    dispatcher.dispatch({
      actionType: ActionTypes.RESTORE_NOTE,
      id
    });

    api.put(API_PATH, { id, updates: {trashed: false} });
  }

  restoreNoteAll() {
    dispatcher.dispatch({
      actionType: ActionTypes.RESTORE_NOTE_ALL
    });

    api.put(API_PATH, { updates: {trashed: false} });
  }

  destroyNote(id) {
    dispatcher.dispatch({
      actionType: ActionTypes.DESTROY_NOTE,
      id
    });

    api.delete(API_PATH, id);
  }

  destroyNoteAll() {
    dispatcher.dispatch({
      actionType: ActionTypes.DESTROY_NOTE_ALL
    });

    api.delete(API_PATH);
  }

  updateRefineTag(tags) {
    dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_REFINE_TAG,
      tags
    });
  }

  toggleCheckNote(id) {
    dispatcher.dispatch({
      actionType: ActionTypes.TOGGLE_CHECK_NOTE,
      id
    });
  }

  toggleCheckNoteAll() {
    dispatcher.dispatch({
      actionType: ActionTypes.TOGGLE_CHECK_NOTE_ALL
    });
  }

}
