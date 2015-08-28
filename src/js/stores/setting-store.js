import EventEmitter from 'eventemitter3';
import assign from 'object-assign';

import dispatcher from '../dispatcher/dispatcher';
import ActionTypes from '../constants/ActionTypes';

const CHANGE_EVENT = 'change';

export default class SettingStore extends EventEmitter {

  constructor() {
    super();
    this._settings = {
      styles: {},
      isOpenSetting: false
    };

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
    this._settings.styles = settings;
  }

  _update(data) {
    this._settings.styles = assign({}, this._settings.styles, data);
  }

  _changeOpenSetting(isOpenSetting) {
    this._settings.isOpenSetting = isOpenSetting;
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
        this._update(action.updates);
        this._emitChange();
        break;

      case ActionTypes.CHANGE_OPEN_SETTINGS:
        this._changeOpenSetting(action.isOpenSetting);
        this._emitChange();
        break;

      default:
        // noop

    }
  }

}
