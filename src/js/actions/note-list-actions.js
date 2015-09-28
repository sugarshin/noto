import crypto from 'crypto';

import dispatcher from '../dispatcher/dispatcher';
import notesAPI from '../utils/notes-api';
import ActionTypes from '../constants/ActionTypes';

export default class NoteListActions {

  fetch() {
    (async function fetch() {
      try {
        const notes = await notesAPI.fetch();

        dispatcher.dispatch({
          actionType: ActionTypes.FETCH_NOTES,
          notes
        });
      } catch (err) {
        console.log('NoteListActions#fetch:\n', err);
      }
    })();
  }

  createNote(note) {
    note.id = crypto.randomBytes(16).toString('hex');

    dispatcher.dispatch({
      actionType: ActionTypes.CREATE_NOTE,
      note
    });

    notesAPI.post(note);
  }

  trashNote(id) {
    dispatcher.dispatch({
      actionType: ActionTypes.TRASH_NOTE,
      id
    });

    notesAPI.put(id, {trashed: true});
  }

  trashCheckedNote(ids) {
    dispatcher.dispatch({
      actionType: ActionTypes.TRASH_CHECKED_NOTE,
      ids
    });

    ids.forEach(id => {
      notesAPI.put(id, {trashed: true});
    });
  }

  restoreNote(id) {
    dispatcher.dispatch({
      actionType: ActionTypes.RESTORE_NOTE,
      id
    });

    notesAPI.put(id, {trashed: false});
  }

  restoreNoteAll() {
    dispatcher.dispatch({
      actionType: ActionTypes.RESTORE_NOTE_ALL
    });

    notesAPI.put(null, {trashed: false}, {
      target: {trashed: true}
    });
  }

  destroyNote(id) {
    dispatcher.dispatch({
      actionType: ActionTypes.DESTROY_NOTE,
      id
    });

    notesAPI.delete(id);
  }

  destroyNoteAll() {
    dispatcher.dispatch({
      actionType: ActionTypes.DESTROY_NOTE_ALL
    });

    notesAPI.delete();
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

  descendingSortNotes(key) {
    dispatcher.dispatch({
      actionType: ActionTypes.DESCENDING_SORT_NOTE,
      key
    });
  }

  ascendingSortNotes(key) {
    dispatcher.dispatch({
      actionType: ActionTypes.ASCENDING_SORT_NOTE,
      key
    });
  }

}
