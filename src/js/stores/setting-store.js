import EventEmitter from 'eventemitter3';
import assign from 'object-assign';

import dispatcher from '../dispatcher/dispatcher';
import { ActionTypes } from '../constants/constants';

const CHANGE_EVENT = 'change';

export default class SettingStore extends EventEmitter {

  constructor() {
    super();
    this._settings = {};
    dispatcher.register(this._handler.bind(this));
  }

  getSettings() {
    return this._settings;
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

  _fetch(settings) {
    this._settings = settings;
  }

  _update(data) {
    this._settings = assign({}, this._settings, data);
  }

  _handler(action) {
    switch (action.actionType) {

      case ActionTypes.FETCH_SETTINGS:
        this._fetch(action.data);
        this._emitChange();
        break;

      case ActionTypes.CHANGE_TEXT_COLOR:
        this._update({color: action.color});
        this._emitChange();
        break;

      case ActionTypes.CHANGE_TEXT_SIZE:
        this._update({size: action.size});
        this._emitChange();
        break;

      case ActionTypes.CHANGE_BACKGROUND_COLOR:
        this._update({backgroundColor: action.backgroundColor});
        this._emitChange();
        break;

      case ActionTypes.RESET_SETTINGS:
        this._update(action.data);
        this._emitChange();
        break;

      default:
        // noop

    }
  }

}
