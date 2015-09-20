import Promise from 'bluebird';
import assign from 'object-assign';
import url from 'url';
import qs from 'qs';

import {
  INITIAL_STORE,
  NOTES_API_PATH,
  SETTINGS_API_PATH } from '../constants/constants';

import apiPathToTableName from './apiPathToTableName';

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
        const tableName = apiPathToTableName(requestPath);

        if (requestPath) {
          resolve(data[tableName]);
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
        if (requestPath !== NOTES_API_PATH) {
          throw new Error(`api.post() only \`${NOTES_API_PATH}\``);
        }
        let data = JSON.parse(localStorage.getItem(NAMESPACE) || STRINGIFY_INITIAL_STORE);
        const tableName = apiPathToTableName(requestPath);

        data[tableName].unshift(payload);
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
  static put(requestPath, { id, updates } = {}) {
    return new Promise((resolve, reject) => {
      try {
        let data = JSON.parse(localStorage.getItem(NAMESPACE) || STRINGIFY_INITIAL_STORE);
        const tableName = apiPathToTableName(requestPath);

        if (requestPath === NOTES_API_PATH) {
          data[tableName] = data[tableName].map(note => {
            if (id == null /* null or undefined */ || note.id === id) {
              return assign({}, note, updates);
            }
            return note;
          });
        }

        if (requestPath === SETTINGS_API_PATH) {
          data[tableName] = assign({}, data[tableName], updates);
        }

        if (requestPath.indexOf(`${NOTES_API_PATH}?`) > -1) {
          const queryParams = qs.parse(url.parse(requestPath).query);
          const { sort, key } = queryParams;

          if (sort === 'descending') {
            data[tableName] = data[tableName].slice().sort((a, b) => {
              return +new Date(a[key]) - +new Date(b[key]);
            });
          }

          if (sort === 'ascending') {
            data[tableName] = data[tableName].slice().sort((a, b) => {
              return +new Date(b[key]) - +new Date(a[key]);
            });
          }
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
        if (requestPath !== NOTES_API_PATH) {
          throw new Error(`'api.delete() only \`${NOTES_API_PATH}\``);
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
