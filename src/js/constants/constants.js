export const APP_ELEMENT_ID = 'container';

export const NOTES_BACKEND_STORE_NAME = 'notes';
export const SETTINGS_BACKEND_STORE_NAME = 'settings';
export const SETTINGS_NOTE_CONFIG = 'noteCofig';

export const DEFAULT = {
  note: {
    id: '',
    title: 'UNTITLED',
    body: '',
    createdAt: null,
    trashed: false,
    checked: false,
    tags: []
  },
  [SETTINGS_NOTE_CONFIG]: {
    color: '#555',
    size: 16,
    backgroundColor: '#eee'
  }
};

export const INITIAL_STORE = {
  [NOTES_BACKEND_STORE_NAME]: [],
  [SETTINGS_BACKEND_STORE_NAME]: DEFAULT[SETTINGS_NOTE_CONFIG]
};

export const FONT_SIZE_VARIATION = [
  9, 10, 11, 12, 13, 14, 15, 16, 18, 20, 24, 28, 32, 40, 48, 64
];
