import assert from 'power-assert';
import _ from 'lodash';

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
        noteStore.removeChangeListener(_assert);
        assert.deepEqual(noteStore.getNotes(), [DEFAULT_NOTE]);
      };
      noteStore.addChangeListener(_assert);
      noteStore._fetchNotes([DEFAULT_NOTE]);
      noteStore._emitChange();
    });
  });

  describe('_createNote()', () => {
    it('case 1', () => {
      const _assert = () => {
        noteStore.removeChangeListener(_assert);
        assert.deepEqual(noteStore.getNotes(), [DEFAULT_NOTE]);
      };
      noteStore.addChangeListener(_assert);
      noteStore._createNote(DEFAULT_NOTE);
      noteStore._emitChange();
    });
  });

  describe('_trashNote()', () => {
    it('case 1', () => {
      const _id = Date.now();
      noteStore._notes = [_.assign({}, DEFAULT_NOTE, {id: _id})];

      const _assert = () => {
        noteStore.removeChangeListener(_assert);
        assert.ok(noteStore.getNotes()[0].trashed);
      };
      noteStore.addChangeListener(_assert);
      noteStore._trashNote(_id);
      noteStore._emitChange();
    });
  });

  describe('_trashCheckedNote()', () => {
    it('case 1', () => {
      const _ids = [
        123, 234, 345
      ];
      noteStore._notes = [
        _.assign({}, DEFAULT_NOTE, {id: _ids[0]}),
        _.assign({}, DEFAULT_NOTE, {id: _ids[1]}),
        _.assign({}, DEFAULT_NOTE, {id: _ids[2]})
      ];

      const _assert = () => {
        const notes = noteStore.getNotes();
        noteStore.removeChangeListener(_assert);
        assert(notes[0].trashed === true);
        assert(notes[1].trashed === false);
        assert(notes[2].trashed === true);
      };
      noteStore.addChangeListener(_assert);
      noteStore._trashCheckedNote([_ids[0], _ids[2]]);
      noteStore._emitChange();
    });
  });

  describe('_restoreNote()', () => {
    it('case 1', () => {
      const _id = Date.now();
      noteStore._notes = [_.assign({}, DEFAULT_NOTE, {id: _id, trashed: true})];

      const _assert = () => {
        noteStore.removeChangeListener(_assert);
        assert(noteStore.getNotes()[0].trashed === false);
      };
      noteStore.addChangeListener(_assert);
      noteStore._restoreNote(_id);
      noteStore._emitChange();
    });
  });

  describe('_restoreNoteAll()', () => {
    it('case 1', () => {
      const _ids = [
        123, 234, 345
      ];
      noteStore._notes = [
        _.assign({}, DEFAULT_NOTE, {id: _ids[0], trashed: true}),
        _.assign({}, DEFAULT_NOTE, {id: _ids[1], trashed: true}),
        _.assign({}, DEFAULT_NOTE, {id: _ids[2], trashed: true})
      ];

      const _assert = () => {
        const notes = noteStore.getNotes();
        noteStore.removeChangeListener(_assert);
        assert(notes[0].trashed === false);
        assert(notes[1].trashed === false);
        assert(notes[2].trashed === false);
      };
      noteStore.addChangeListener(_assert);
      noteStore._restoreNoteAll();
      noteStore._emitChange();
    });
  });

  describe('_destroyNote()', () => {
    it('case 1', () => {
      const _ids = [
        123, 234, 345, 456
      ];
      noteStore._notes = [
        _.assign({}, DEFAULT_NOTE, {id: _ids[0], trashed: true}),
        _.assign({}, DEFAULT_NOTE, {id: _ids[1], trashed: true}),
        _.assign({}, DEFAULT_NOTE, {id: _ids[2], trashed: false}),
        _.assign({}, DEFAULT_NOTE, {id: _ids[3], trashed: false})
      ];

      const _assert = () => {
        const notes = noteStore.getNotes();
        noteStore.removeChangeListener(_assert);
        assert(notes.length === 3);
        assert(notes[0].id === _ids[0]);
        assert(notes[1].id === _ids[2]);
        assert(notes[2].id === _ids[3]);
      };
      noteStore.addChangeListener(_assert);
      noteStore._destroyNote(_ids[1]);
      noteStore._emitChange();
    });
  });

  describe('_destroyTrashedNoteAll()', () => {
    it('case 1', () => {
      const _ids = [
        123, 234, 345
      ];
      noteStore._notes = [
        _.assign({}, DEFAULT_NOTE, {id: _ids[0], trashed: true}),
        _.assign({}, DEFAULT_NOTE, {id: _ids[1], trashed: true}),
        _.assign({}, DEFAULT_NOTE, {id: _ids[2], trashed: true})
      ];

      const _assert = () => {
        const notes = noteStore.getNotes();
        noteStore.removeChangeListener(_assert);
        assert(notes.length === 0);
      };
      noteStore.addChangeListener(_assert);
      noteStore._destroyTrashedNoteAll();
      noteStore._emitChange();
    });
  });

  describe('_toggleCheckNote()', () => {
    it('case 1', () => {
      const _ids = [
        123, 234, 345
      ];
      noteStore._notes = [
        _.assign({}, DEFAULT_NOTE, {id: _ids[0], checked: true}),
        _.assign({}, DEFAULT_NOTE, {id: _ids[1], checked: false}),
        _.assign({}, DEFAULT_NOTE, {id: _ids[2], checked: true})
      ];

      const _assert = () => {
        const notes = noteStore.getNotes();
        noteStore.removeChangeListener(_assert);
        assert(notes[0].checked === true);
        assert(notes[1].checked === false);
        assert(notes[2].checked === false);
      };
      noteStore.addChangeListener(_assert);
      noteStore._toggleCheckNote(_ids[2]);
      noteStore._emitChange();
    });
  });

  describe('_toggleCheckNoteAll()', () => {
    it('case 1', () => {
      const _ids = [
        123, 234, 345
      ];
      noteStore._notes = [
        _.assign({}, DEFAULT_NOTE, {id: _ids[0], checked: true}),
        _.assign({}, DEFAULT_NOTE, {id: _ids[1], checked: false}),
        _.assign({}, DEFAULT_NOTE, {id: _ids[2], checked: true})
      ];

      const _assert = () => {
        const notes = noteStore.getNotes();
        noteStore.removeChangeListener(_assert);
        assert(notes[0].checked === false);
        assert(notes[1].checked === true);
        assert(notes[2].checked === false);
      };
      noteStore.addChangeListener(_assert);
      noteStore._toggleCheckNoteAll();
      noteStore._emitChange();
    });
  });

});
