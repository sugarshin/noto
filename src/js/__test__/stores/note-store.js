import assert from 'power-assert';
import assign from 'object-assign';

import { noteStore } from '../../context';
import { DEFAULT } from '../../constants/constants';

const DEFAULT_NOTE = DEFAULT.note;

describe('NoteStore', () => {
  beforeEach(done => {
    noteStore._notes = [];
    done();
  });

  describe('_fetchNotes()', () => {
    it('case 1', () => {
      const _assert = () => {
        assert.deepEqual(noteStore.getNotes(), [DEFAULT_NOTE]);
      };
      noteStore.addChangeListener(_assert);
      noteStore._fetchNotes([DEFAULT_NOTE]);
      noteStore._emitChange();
      noteStore.removeChangeListener(_assert);
    });
  });

  describe('_createNote()', () => {
    it('case 1', () => {
      const _assert = () => {
        assert.deepEqual(noteStore.getNotes(), [DEFAULT_NOTE]);
      };
      noteStore.addChangeListener(_assert);
      noteStore._createNote(DEFAULT_NOTE);
      noteStore._emitChange();
      noteStore.removeChangeListener(_assert);
    });
  });

  describe('_trashNote()', () => {
    it('case 1', () => {
      const _id = Date.now();
      noteStore._notes = [assign({}, DEFAULT_NOTE, {id: _id})];

      const _assert = () => {
        assert.ok(noteStore.getNotes()[0].trashed);
      };
      noteStore.addChangeListener(_assert);
      noteStore._trashNote(_id);
      noteStore._emitChange();
      noteStore.removeChangeListener(_assert);
    });
  });

  describe('_trashCheckedNote()', () => {
    it('case 1', () => {
      const _ids = [
        123, 234, 345
      ];
      noteStore._notes = [
        assign({}, DEFAULT_NOTE, {id: _ids[0]}),
        assign({}, DEFAULT_NOTE, {id: _ids[1]}),
        assign({}, DEFAULT_NOTE, {id: _ids[2]})
      ];

      const _assert = () => {
        const notes = noteStore.getNotes();
        assert(notes[0].trashed === true);
        assert(notes[1].trashed === false);
        assert(notes[2].trashed === true);
      };
      noteStore.addChangeListener(_assert);
      noteStore._trashCheckedNote([_ids[0], _ids[2]]);
      noteStore._emitChange();
      noteStore.removeChangeListener(_assert);
    });
  });

});
