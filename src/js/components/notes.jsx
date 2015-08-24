import React, { Component, PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

import NoteItemList from './note-item-list';
import Note from './note';
import { DEFAULT_NOTE } from '../constants/constants';
import { baseTitle } from '../config/settings';

export default class Notes extends Component {

  static get propTypes() {
    return {
      notes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string
      })),
      setting: PropTypes.object,
      refineTag: PropTypes.arrayOf(PropTypes.string)
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { notes, setting, refineTag, params } = this.props;
    const note = this._findWhereNote(notes, params.id) || DEFAULT_NOTE;

    return (
      <DocumentTitle title={`${note.title} | Notes | ${baseTitle}`}>
        <div className="notes-container">
          <NoteItemList notes={notes} refineTag={refineTag} />
          <Note note={note} setting={setting} />
        </div>
      </DocumentTitle>
    );
  }

  _findWhereNote(notes, id) {
    for (let i = 0, l = notes.length; i < l; i++) {
      const note = notes[i];
      if (note.id === id) {
        return note;
      }
    }
    return null;
  }

}
