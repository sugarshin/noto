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

  describe('_replaceNotes()', () => {
    it('case 1', () => {
      const _assert = () => {
        noteStore.removeChangeListener(_assert);
        assert.deepEqual(noteStore.getNotes(), [DEFAULT_NOTE]);
      };
      noteStore.addChangeListener(_assert);
      noteStore._replaceNotes([DEFAULT_NOTE]);
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

  describe('_updateNote()', () => {
    it('case note.title', () => {
      const _ids = [
        123, 234, 345
      ];
      noteStore._notes = [
        _.assign({}, DEFAULT_NOTE, {id: _ids[0], title: 'title1'}),
        _.assign({}, DEFAULT_NOTE, {id: _ids[1], title: 'title2'}),
        _.assign({}, DEFAULT_NOTE, {id: _ids[2], title: 'title3'})
      ];

      const _assert1 = () => {
        const notes = noteStore.getNotes();
        noteStore.removeChangeListener(_assert1);
        assert.deepEqual(notes[0].title, 'title1');
        assert.deepEqual(notes[1].title, 'title2');
        assert.deepEqual(notes[2].title, 'update title');
      };
      noteStore.addChangeListener(_assert1);
      noteStore._updateNote(_ids[2], {title: 'update title'});
      noteStore._emitChange();
    });

    it('case note.body', () => {
      const _ids = [
        123, 234, 345
      ];
      noteStore._notes = [
        _.assign({}, DEFAULT_NOTE, {id: _ids[0], body: 'body1'}),
        _.assign({}, DEFAULT_NOTE, {id: _ids[1], body: 'body2'}),
        _.assign({}, DEFAULT_NOTE, {id: _ids[2], body: 'body3'})
      ];

      const _assert2 = () => {
        const notes = noteStore.getNotes();
        noteStore.removeChangeListener(_assert2);
        assert.deepEqual(notes[0].body, 'body1');
        assert.deepEqual(notes[1].body, 'body2');
        assert.deepEqual(notes[2].body, 'update body');
      };
      noteStore.addChangeListener(_assert2);
      noteStore._updateNote(_ids[2], {body: 'update body'});
      noteStore._emitChange();
    });

    it('case note.tags', () => {
      const _ids = [
        123, 234, 345
      ];
      noteStore._notes = [
        _.assign({}, DEFAULT_NOTE, {id: _ids[0], tags: ['tag1', 'tag2', 'tag3']}),
        _.assign({}, DEFAULT_NOTE, {id: _ids[1], tags: ['tag1', 'tag2']}),
        _.assign({}, DEFAULT_NOTE, {id: _ids[2], tags: ['tag1', 'tag3']})
      ];

      const _assert3 = () => {
        const notes = noteStore.getNotes();
        noteStore.removeChangeListener(_assert3);
        assert.deepEqual(notes[0].tags, ['tag1', 'tag2', 'tag3']);
        assert.deepEqual(notes[1].tags, ['tag1', 'tag2']);
        assert.deepEqual(notes[2].tags, ['12']);
      };
      noteStore.addChangeListener(_assert3);
      noteStore._updateNote(_ids[2], {tags: ['12']});
      noteStore._emitChange();
    });
  });

});
