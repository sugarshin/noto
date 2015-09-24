import Promise from 'bluebird';
import localforage from 'localforage';
import assign from 'lodash/object/assign';
import cloneDeep from 'lodash/lang/cloneDeep';
import where from 'lodash/collection/where';

import {
  INITIAL_STORE,
  NOTES_BACKEND_STORE_NAME } from '../constants/constants';

const notesStore = localforage.createInstance({
  name: NOTES_BACKEND_STORE_NAME
});
const initialStoreNotes = cloneDeep(INITIAL_STORE)[NOTES_BACKEND_STORE_NAME];

export default class notesAPI {

  /**
   * fetch
   *
   * GET
   * @param  {String} (Optional) id
   * @return {Promise}
   */
  static fetch(id) {
    if (id) {
      return notesStore.getItem(id);
    }

    return Promise.resolve()
      .then(() => {
        return notesStore.keys();
      })
      .then(keys => {
        if (keys.length > 0) {
          return Promise.all(keys.map(key => {
            return notesStore.getItem(key);
          }));
        }

        return initialStoreNotes;
      });
  }

  /**
   * post
   *
   * POST
   * @param  {Object} payload note object
   * @return {Promise}
   */
  static post(payload) {
    const { id } = payload;
    return notesStore.setItem(id, payload);
  }

  /**
   * put
   *
   * PUT
   * @param  {String} id
   * @param  {Object} updates
   * @param  {Object} option
   * @return {Promise}
   */
  static put(id, updates, option) {
    if (id) {
      return Promise.resolve()
        .then(() => {
          return notesStore.getItem(id);
        })
        .then(note => {
          note = assign({}, note, updates);
          return note;
        })
        .then(note => {
          return notesStore.setItem(id, note);
        });
    }

    return Promise.resolve()
      .then(() => {
        return notesStore.keys();
      })
      .then(keys => {
        return Promise.all(keys.map(key => {
          return notesStore.getItem(key);
        }));
      })
      .then(notes => {
        if (option && option.target) {
          return where(notes, option.target);
        }
        return notes
      })
      .then(notes => {
        return Promise.all(notes.map(note => {
          note = assign({}, note, updates);
          return notesStore.setItem(note.id, note);
        }));
      });
  }

  /**
   * delete
   *
   * DELETE
   * @param  {String} Optional id
   * @return {Promise}
   */
  static delete(id) {
    if (id) {
      return notesStore.removeItem(id);
    }

    return Promise.resolve()
      .then(() => {
        return notesStore.keys();
      })
      .then(keys => {
        return Promise.all(keys.map(key => {
          return notesStore.getItem(key);
        }));
      })
      .then(notes => {
        return notes.filter(note => note.trashed);
      })
      .then(notes => {
        return Promise.all(notes.map(note => {
          return notesStore.removeItem(note.id);
        }));
      });
  }

}
