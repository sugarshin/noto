export const APP_ELEMENT_ID = 'container';

export const DEFAULT = {
  note: {
    id: '',
    title: 'UNTITLED',
    body: '',
    createdAt: '',
    trashed: false,
    checked: false,
    tags: []
  },
  settings: {
    color: '#555',
    size: 16,
    backgroundColor: '#eee'
  }
};

export const INITIAL_STORE = {
  notes: [],
  settings: DEFAULT.settings
};

export const FONT_SIZE_VARIATION = [
  9, 10, 11, 12, 13, 14, 15, 16, 18, 20, 24, 28, 32, 40, 48, 64
];
