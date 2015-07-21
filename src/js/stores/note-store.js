import EventEmitter from 'eventemitter3';

import dispatcher from '../dispatcher/dispatcher';
import { ActionTypes } from '../constants/constants';

const {
  FETCH_NOTES,
  CREATE_NOTE,
  TRASH_NOTE,
  RESTORE_NOTE,
  DESTROY_NOTE,
  UPDATE_TAG,
  UPDATE_TITLE,
  INPUT_TEXT
} = ActionTypes;

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

  _fetchNotes(notes) {
    this._notes = notes;
  }

  _createNotes(note) {
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

  _restoreNote(id) {
    this._notes = this._notes.map(note => {
      if (note.id === id) {
        note.trashed = false;
      }
      return note;
    });
  }

  _destroyNote(id) {
    this._notes = this._notes.filter(note => {
      if (note.id !== id) {
        return note;
      }
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

  _inputText(id, text) {
    this._notes = this._notes.map(note => {
      if (note.id === id) {
        note.body = text;
      }
      return note;
    });
  }

  _handler(action) {
    switch (action.actionType) {

      case FETCH_NOTES:
        this._fetchNotes(action.notes);
        this._emitChange();
        break;

      case CREATE_NOTE:
        this._createNotes(action.note);
        this._emitChange();
        break;

      case TRASH_NOTE:
        this._trashNote(action.id);
        this._emitChange();
        break;

      case RESTORE_NOTE:
        this._restoreNote(action.id);
        this._emitChange();
        break;

      case DESTROY_NOTE:
        this._destroyNote(action.id)
        this._emitChange();
        break;

      case UPDATE_TAG:
        this._updateTag(action.id, action.tags);
        this._emitChange();
        break;

      case UPDATE_TITLE:
        this._updateTitle(action.id, action.title);
        this._emitChange();
        break;

      case INPUT_TEXT:
        this._inputText(action.id, action.text);
        this._emitChange();
        break;

      default:
        // noop

    }
  }

}
