import React, { Component, PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

import TrashedNoteItemList from './trashed-note-item-list';
import { baseTitle } from '../config/settings';

export default class TrashedNotes extends Component {

  static get propTypes() {
    return {
      notes: PropTypes.arrayOf(PropTypes.object)
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { notes } = this.props;

    return (
      <DocumentTitle title={`Trash box | ${baseTitle}`}>
        <div className="notes-container">
          <TrashedNoteItemList notes={notes} />
        </div>
      </DocumentTitle>
    );
  }

}
