import Promise from 'bluebird';
import assign from 'object-assign';

import { INITIAL_STORE } from '../constants/constants';

import { name as NAMESPACE } from '../../../package';

const STRINGIFY_INITIAL_STORE = JSON.stringify(INITIAL_STORE);

export default {

  fetch(path) {
    return new Promise((resolve, reject) => {
      try {
        const data = JSON.parse(localStorage.getItem(NAMESPACE) || STRINGIFY_INITIAL_STORE);
        if (path) {
          resolve(data[path]);
        } else {
          resolve(data);
        }
      } catch (err) {
        reject(err);
      }
    });
  },

  post(path, payload) {
    return new Promise((resolve, reject) => {
      try {
        if (path !== 'notes') {
          throw new Error('api.post() only notes');
        }
        let data = JSON.parse(localStorage.getItem(NAMESPACE) || STRINGIFY_INITIAL_STORE);
        data[path].push(payload);
        localStorage.setItem(NAMESPACE, JSON.stringify(data));
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  },

  /**
   * @path 'notes', 'settings'
   * { id } note id. String or (null or undefined)
   *   All will be update if it was null or undefined
   * { updates } updates Object
   */
  put(path, { id, updates }) {
    return new Promise((resolve, reject) => {
      try {
        let data = JSON.parse(localStorage.getItem(NAMESPACE) || STRINGIFY_INITIAL_STORE);

        if (path === 'notes') {
          data[path] = data[path].map(note => {
            if (id == null /* null or undefined */ || note.id === id) {
              return assign({}, note, updates);
            }
            return note;
          });
        } else if (path === 'settings') {
          data[path] = assign({}, data[path], updates);
        }

        resolve(
          localStorage.setItem(NAMESPACE, JSON.stringify(data))
        );
      } catch (err) {
        reject(err);
      }
    });
  },

  /**
   * @path 'notes'
   * { id } notes id String or null or undefined
   *   All will be delete if it was null or undefined
   */
  delete(path, id) {
    return new Promise((resolve, reject) => {
      try {
        if (path !== 'notes') {
          throw new Error('api.post() only notes');
        }

        let data = JSON.parse(localStorage.getItem(NAMESPACE) || STRINGIFY_INITIAL_STORE);
        if (id == null) {
          data.notes = data.notes.filter(note => note.trashed === false);
        } else {
          data.notes = data.notes.filter(note => note.id !== id);
        }
        localStorage.setItem(NAMESPACE, JSON.stringify(data));
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

}
