import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import Select from 'react-select';
import assign from 'object-assign';

import Setting from './setting';
import NoteItemList from './note-item-list';
import Note from './note';
import { DEFAULT_NOTE } from '../constants/constants';
import { baseTitle } from '../config/settings';

export default class Notes extends Component {

  static get propTypes() {
    return {
      notes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        body: PropTypes.string,
        createdAt: PropTypes.string,
        trashed: PropTypes.bool,
        tags: PropTypes.arrayOf(PropTypes.string)
      })),
      setting: PropTypes.shape({
        color: PropTypes.string,
        size: PropTypes.number,
        backgroundColor: PropTypes.string
      }),
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
          <Setting setting={setting} />
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
