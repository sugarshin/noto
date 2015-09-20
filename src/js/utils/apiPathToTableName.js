/**
 * apiPathToTableName
 *
 * @param {String} apiPath
 * @return {String}
 */

export default function apiPathToTableName(apiPath) {
  return apiPath.replace(/\?.+[=].+/gm, '').slice(1);
}
