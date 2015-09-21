import assert from 'power-assert';
import _ from 'lodash';

import api from '../../utils/api';
import {
  INITIAL_STORE,
  NOTES_API_PATH,
  SETTINGS_API_PATH,
  DEFAULT } from '../../constants/constants';

describe('api', () => {

  afterEach(() => {
    localStorage.clear();
  });

  describe('.fetch()', () => {
    it('all', () => {
      return api.fetch().then(res => {
        assert.deepEqual(res, INITIAL_STORE, 'fetch all');
      });
    });

    it('notes', () => {
      return api.fetch(NOTES_API_PATH).then(res => {
        assert.deepEqual(res, INITIAL_STORE.notes, 'fetch notes');
      });
    });

    it('settings', () => {
      return api.fetch(SETTINGS_API_PATH).then(res => {
        assert.deepEqual(res, INITIAL_STORE.settings, 'fetch settings');
      });
    });
  });

  describe('.post()', () => {
    it('Create note', () => {
      const expected = _.assign({}, DEFAULT.note, {
        id: Date.now(),
        createdAt: Date.now()
      });

      return api.post(NOTES_API_PATH, expected)
        .then(() => {
          return api.fetch(NOTES_API_PATH);
        })
        .then(res => {
          assert.deepEqual(res[0], expected, 'post');
        });
    });

    it('Only notes', () => {
      return api.post(SETTINGS_API_PATH)
        .catch(err => {
          assert.throws(err);
        });
    });
  });

  describe('.put()', () => {
    it('Update notes', () => {
      const now1 = Date.now() * Math.random();
      const now2 = Date.now() * Math.random();
      const note1 = _.assign({}, DEFAULT.note, {
        id: now1,
        createdAt: now1
      });
      const note2 = _.assign({}, DEFAULT.note, {
        id: now2,
        createdAt: now2
      });
      const payload = {
        id: now2,
        updates: {
          title: 'edited'
        }
      };

      return api.post(NOTES_API_PATH, note1)
        .then(() => {
          api.post(NOTES_API_PATH, note2);
        })
        .then(() => {
          api.put(NOTES_API_PATH, payload);
        })
        .then(() => {
          return api.fetch(NOTES_API_PATH);
        })
        .then(res => {
          assert.deepEqual(res[0], _.assign({}, note2, payload.updates), 'Update note');
        });
    });

  });

});
