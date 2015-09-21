import assert from 'power-assert';

import apiPathToStoreName from '../../utils/apiPathToStoreName';

describe('apiPathToStoreName', () => {
  it('case 1', () => {
    const actual = apiPathToStoreName('/name1');
    const expected = 'name1';
    assert(actual === expected);
  });

  it('case 2', () => {
    const actual = apiPathToStoreName('/name2?query=1');
    const expected = 'name2';
    assert(actual === expected);
  });

  it('case 3', () => {
    const actual = apiPathToStoreName('/name3?query=1&q=3&name');
    const expected = 'name3';
    assert(actual === expected);
  });
});
