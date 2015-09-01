import EventEmitter from 'eventemitter3';

import dispatcher from '../dispatcher/dispatcher';
import ActionTypes from '../constants/ActionTypes';

const CHANGE_EVENT = 'change';

export default class NoteStore extends EventEmitter {

  constructor() {
    super();
    this._notes = [];
    dispatcher.register(this._handler.bind(this));
  }

  getNotes() {
    return this._notes;
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.off(CHANGE_EVENT, callback);
  }

  _emitChange() {
    this.emit(CHANGE_EVENT);
  }

  _replaceNotes(notes) {
    this._notes = notes;
  }

  _createNote(note) {
    this._notes.push(note);
  }

  _trashNote(id) {
    this._notes = this._notes.map(note => {
      if (note.id === id) {
        note.trashed = true;
      }
      return note;
    });
  }

  _trashCheckedNote(ids) {
    this._notes = this._notes.map(note => {
      if (ids.indexOf(note.id) !== -1) {
        note.trashed = true;
      }
      return note;
    });
  }

  _restoreNote(id) {
    this._notes = this._notes.map(note => {
      if (note.id === id) {
        note.trashed = false;
      }
      return note;
    });
  }

  _restoreNoteAll() {
    this._notes = this._notes.map(note => {
      note.trashed = false;
      return note;
    });
  }

  _destroyNote(id) {
    this._notes = this._notes.filter(note => note.id !== id);
  }

  _destroyTrashedNoteAll() {
    this._notes = this._notes.filter(note => note.trashed === false);
  }

  _toggleCheckNote(id) {
    this._notes = this._notes.map(note => {
      if (note.id === id) {
        note.checked = !note.checked;
      }
      return note;
    });
  }

  _toggleCheckNoteAll() {
    this._notes = this._notes.map(note => {
      note.checked = !note.checked;
      return note;
    });
  }

  _updateTag(id, tags) {
    this._notes = this._notes.map(note => {
      if (note.id === id) {
        note.tags = tags;
      }
      return note;
    });
  }

  _updateTitle(id, title) {
    this._notes = this._notes.map(note => {
      if (note.id === id) {
        note.title = title;
      }
      return note;
    });
  }

  _updateBody(id, body) {
    this._notes = this._notes.map(note => {
      if (note.id === id) {
        note.body = body;
      }
      return note;
    });
  }

  _handler(action) {
    switch (action.actionType) {

      case ActionTypes.FETCH_NOTES:
        this._replaceNotes(action.notes);
        this._emitChange();
        break;

      case ActionTypes.CREATE_NOTE:
        this._createNote(action.note);
        this._emitChange();
        break;

      case ActionTypes.TRASH_NOTE:
        this._trashNote(action.id);
        this._emitChange();
        break;

      case ActionTypes.TRASH_CHECKED_NOTE:
        this._trashCheckedNote(action.ids);
        this._emitChange();
        break;

      case ActionTypes.RESTORE_NOTE:
        this._restoreNote(action.id);
        this._emitChange();
        break;

      case ActionTypes.RESTORE_NOTE_ALL:
        this._restoreNoteAll();
        this._emitChange();
        break;

      case ActionTypes.DESTROY_NOTE:
        this._destroyNote(action.id)
        this._emitChange();
        break;

      case ActionTypes.DESTROY_NOTE_ALL:
        this._destroyTrashedNoteAll()
        this._emitChange();
        break;

      case ActionTypes.TOGGLE_CHECK_NOTE:
        this._toggleCheckNote(action.id)
        this._emitChange();
        break;

      case ActionTypes.TOGGLE_CHECK_NOTE_ALL:
        this._toggleCheckNoteAll()
        this._emitChange();
        break;

      case ActionTypes.UPDATE_TAG:
        this._updateTag(action.id, action.tags);
        this._emitChange();
        break;

      case ActionTypes.UPDATE_TITLE:
        this._updateTitle(action.id, action.title);
        this._emitChange();
        break;

      case ActionTypes.UPDATE_BODY:
        this._updateBody(action.id, action.body);
        this._emitChange();
        break;

      default:
        // noop

    }
  }

}
