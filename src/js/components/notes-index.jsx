import React, { Component, PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

import NoteItemList from './note-item-list';
import { baseTitle } from '../config/settings';

export default class NotesIndex extends Component {

  static get propTypes() {
    return {
      notes: PropTypes.arrayOf(PropTypes.object),
      refineTag: PropTypes.arrayOf(PropTypes.string)
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { notes, refineTag } = this.props;

    return (
      <DocumentTitle title={`Notes | ${baseTitle}`}>
        <div className="notes-container">
          <NoteItemList notes={notes} refineTag={refineTag} />
        </div>
      </DocumentTitle>
    );
  }

}
