import assert from 'power-assert';

import { noteStore } from '../../context';
import { DEFAULT } from '../../constants/constants';

describe('NoteStore', () => {
  beforeEach(done => {
    noteStore._notes = [];
    done();
  });

  describe('_fetchNotes()', () => {
    it('case 1', () => {
      const _assert = () => {
        assert.deepEqual(noteStore.getNotes(), [DEFAULT.note]);
      };
      noteStore.addChangeListener(_assert);
      noteStore._fetchNotes([DEFAULT.note]);
      noteStore._emitChange();
      noteStore.removeChangeListener(_assert);
    });
  });

  describe('_createNote()', () => {
    it('case 1', () => {
      const _assert = () => {
        assert.deepEqual(noteStore.getNotes(), [DEFAULT.note]);
      };
      noteStore.addChangeListener(_assert);
      noteStore._createNote(DEFAULT.note);
      noteStore._emitChange();
      noteStore.removeChangeListener(_assert);
    });
  });

});
