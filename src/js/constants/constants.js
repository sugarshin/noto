import keyMirror from 'react/lib/keyMirror';

export default {
  DEFAULT_STATE: {
    notes: [],
    settings: {
      color: '#555',
      size: 13,
      backgroundColor: '#eee'
    }
  },

  ActionTypes: keyMirror({
    CREATE_NOTE: null,
    TRASH_NOTE: null,
    RESTORE_NOTE: null,
    DESTROY_NOTE: null,

    UPDATE_TITLE: null,
    UPDATE_TAG: null,
    INPUT_TEXT: null,

    CHANGE_TEXT_COLOR: null,
    CHANGE_TEXT_SIZE: null,
    CHANGE_BACKGROUND_COLOR: null,
    RESET_SETTINGS: null,

    FETCH_NOTES: null,
    FETCH_SETTINGS: null
  })
};
