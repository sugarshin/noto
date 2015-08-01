import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import assign from 'object-assign';

import Setting from './setting';
import NoteItemList from './note-item-list';
import { noteListActions } from '../context';
import { baseTitle } from '../config/settings';

export default class NotesIndex extends Component {

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
    const { notes, setting, refineTag } = this.props;

    return (
      <DocumentTitle title={`Notes | ${baseTitle}`}>
        <div className="notes-container">
          <Setting setting={setting} />
          <NoteItemList notes={notes} refineTag={refineTag} />
        </div>
      </DocumentTitle>
    );
  }

}
