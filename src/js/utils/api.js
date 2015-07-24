import Promise from 'bluebird';
import assign from 'object-assign';

import { INITIAL_STORE } from '../constants/constants';

import { name as NAMESPACE } from '../../../package';

const STRINGIFY_INITIAL_STORE = JSON.stringify(INITIAL_STORE);

export default class api {

  static fetch(path) {
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
  }

  static post(path, payload) {
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
  }

  /**
   * @path 'notes', 'settings'
   * { id } notes id String
   * { updates } updates Object
   */
  static put(path, { id, updates }) {
    return new Promise((resolve, reject) => {
      try {
        let data = JSON.parse(localStorage.getItem(NAMESPACE) || STRINGIFY_INITIAL_STORE);

        if (path === 'notes') {
          data[path] = data[path].map(note => {
            if (note.id === id) {
              return assign({}, note, updates);
            }
            return note;
          });
        } else if (path === 'settings') {
          data[path] = assign({}, data[path], updates);
        }

        localStorage.setItem(NAMESPACE, JSON.stringify(data));
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  static delete(path, id) {
    return new Promise((resolve, reject) => {
      try {
        if (path !== 'notes') {
          throw new Error('api.post() only notes');
        }

        let data = JSON.parse(localStorage.getItem(NAMESPACE) || STRINGIFY_INITIAL_STORE);
        data.notes = data.notes.filter(note => note.id !== id);
        localStorage.setItem(NAMESPACE, JSON.stringify(data));
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

}
