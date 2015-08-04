import keyMirror from 'react/lib/keyMirror';

export default {
  APP_ELEMENT_ID: 'container',
  DEFAULT_NOTE: {
    id: '',
    title: 'UNTITLED',
    body: '',
    createdAt: '',
    trashed: false,
    tags: []
  },
  INITIAL_STORE: {
    notes: [],
    settings: {
      color: '#555',
      size: 16,
      backgroundColor: '#eee'
    }
  },
  FONT_SIZE_VARIATION: [
    9, 10, 11, 12, 13, 14, 15, 16, 18, 20, 24, 28, 32, 40, 48, 64
  ],
  ActionTypes: keyMirror({
    CREATE_NOTE: null,
    TRASH_NOTE: null,
    TRASH_CHECKED_NOTE: null,
    RESTORE_NOTE: null,
    RESTORE_NOTE_ALL: null,
    DESTROY_NOTE: null,
    DESTROY_NOTE_ALL: null,
    TOGGLE_CHECK_NOTE: null,
    TOGGLE_CHECK_NOTE_ALL: null,

    UPDATE_TITLE: null,
    UPDATE_TAG: null,
    INPUT_TEXT: null,

    CHANGE_TEXT_COLOR: null,
    CHANGE_TEXT_SIZE: null,
    CHANGE_BACKGROUND_COLOR: null,
    RESET_SETTINGS: null,

    FETCH_NOTES: null,
    FETCH_SETTINGS: null,
    UPDATE_REFINE_TAG: null
  })
};
