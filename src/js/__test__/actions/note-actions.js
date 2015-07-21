import assert from 'power-assert';

import crypto from 'crypto';

import dispatcher from '../../dispatcher/dispatcher';

import { ActionTypes } from '../../constants/constants';

import NoteAction from '../../actions/note-actions';

const { UPDATE_TAG } = ActionTypes;

const actions = new NoteAction();

describe('NoteAction', () => {

  describe('.updateTag()', () => {

    it('case 1', () => {
      const _id = crypto.randomBytes(16).toString('hex');
      const tagName = 'tag';

      dispatcher.register(action => {
        assert(action.actionType === UPDATE_TAG);
        assert(action.id === _id);
        assert(Array.isArray(action.tags));
        assert(action.tags[0] === tagName);
      });

      actions.updateTag(_id, [tagName]);
    });

  });

});
