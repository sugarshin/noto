import assert from 'power-assert';
import crypto from 'crypto';

import dispatcher from '../../dispatcher/dispatcher';
import ActionTypes from '../../constants/ActionTypes';
import { noteActions } from '../../context';

describe('NoteActions', () => {
  let _id;

  beforeEach(() => {
    _id = crypto.randomBytes(16).toString('hex');
  });

  describe('.updateTag()', () => {

    it('case 1', () => {
      const tagName = 'tag';
      dispatcher.register(action => {
        if (action.actionType === ActionTypes.UPDATE_TAG) {
          assert(action.id === _id);
          assert(Array.isArray(action.tags));
          assert(action.tags[0] === tagName);
        }
      });

      noteActions.updateTag(_id, [tagName]);
    });

  });

  describe('.updateTitle()', () => {

    it('case 1', () => {
      const title = 'title1';
      dispatcher.register(action => {
        if (action.actionType === ActionTypes.UPDATE_TITLE) {
          assert(action.id === _id);
          assert(typeof action.title === 'string');
          assert(action.title === title);
        }
      });

      noteActions.updateTitle(_id, title);
    });

  });

});
