import EventEmitter from 'eventemitter3';

import dispatcher from '../dispatcher/dispatcher';
import ActionTypes from '../constants/ActionTypes';

const CHANGE_EVENT = 'change';

export default class RefineTagStore extends EventEmitter {

  constructor() {
    super();
    this._tags = [];
    dispatcher.register(this._handler.bind(this));
  }

  getTags() {
    return this._tags;
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

  _replace(tags) {
    this._tags = tags;
  }

  _handler(action) {
    switch (action.actionType) {

      case ActionTypes.UPDATE_REFINE_TAG:
        this._replace(action.tags);
        this._emitChange();
        break;

      default:
        // noop

    }
  }

}
