import Promise from 'bluebird';
import assign from 'object-assign';

import { INITIAL_STORE } from '../constants/constants';

import { name as NAMESPACE } from '../../../package';

const STRINGIFY_INITIAL_STORE = JSON.stringify(INITIAL_STORE);

export default class api {

  /**
   * fetch
   *
   * GET
   * @param {String} requestPath 'notes' or 'settings'
   * @return {Promise}
   */
  static fetch(requestPath) {
    return new Promise((resolve, reject) => {
      try {
        const data = JSON.parse(localStorage.getItem(NAMESPACE) || STRINGIFY_INITIAL_STORE);
        if (requestPath) {
          resolve(data[requestPath]);
        } else {
          resolve(data);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * post
   *
   * POST
   * @param {String} requestPath only 'notes'
   * @param {Object} payload note
   * @return {Promise}
   */
  static post(requestPath, payload) {
    return new Promise((resolve, reject) => {
      try {
        if (requestPath !== 'notes') {
          throw new Error('api.post() only \`notes\`');
        }
        let data = JSON.parse(localStorage.getItem(NAMESPACE) || STRINGIFY_INITIAL_STORE);
        data[requestPath].unshift(payload);
        localStorage.setItem(NAMESPACE, JSON.stringify(data));
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * put
   *
   * PUT
   * @param {String} requestPath 'notes' or 'settings'
   * @param {Object} { id, updates }
   *   { id } note id. String or (null or undefined)
   *     All will be update if it was null or undefined
   *   { updates } updates Object
   * @return {Promise}
   */
  static put(requestPath, { id, updates }) {
    return new Promise((resolve, reject) => {
      try {
        let data = JSON.parse(localStorage.getItem(NAMESPACE) || STRINGIFY_INITIAL_STORE);

        if (requestPath === 'notes') {
          data[requestPath] = data[requestPath].map(note => {
            if (id == null /* null or undefined */ || note.id === id) {
              return assign({}, note, updates);
            }
            return note;
          });
        } else if (requestPath === 'settings') {
          data[requestPath] = assign({}, data[requestPath], updates);
        }

        resolve(
          localStorage.setItem(NAMESPACE, JSON.stringify(data))
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * delete
   *
   * DELETE
   * @param {String} requestPath 'notes'
   * @param {String} id notes id String or null or undefined
   *   All will be delete if it was null or undefined
   * @return {Promise}
   */
  static delete(requestPath, id) {
    return new Promise((resolve, reject) => {
      try {
        if (requestPath !== 'notes') {
          throw new Error('api.delete() only \`notes\`');
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
