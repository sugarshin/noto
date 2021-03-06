import React, { Component, PropTypes } from 'react';

import NoteListLink from './note-list-link';
import TrashedNoteItem from './trashed-note-item';

import { noteListActions } from '../context';

export default class TrashedNoteItemList extends Component {

  static get propTypes() {
    return {
      notes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        trashed: PropTypes.bool
      }))
    };
  }

  constructor(props) {
    super(props);

    this.handleClickRestoreAllButton = this.handleClickRestoreAllButton.bind(this);
    this.handleClickDestroyAllButton = this.handleClickDestroyAllButton.bind(this);
  }

  render() {
    const { notes } = this.props;
    const trashedNoteItems = notes.filter(note => note.trashed === true)
      .map(note => {
          return <TrashedNoteItem note={note} key={note.id} />;
      });

    return (
      <div className="trashed-note-list-container note-list-container">
        <div className="note-list-header">
          <div className="note-list-controller">
            <button className="button-base"
                    onClick={this.handleClickRestoreAllButton}>
              <span className="octicon octicon-mail-reply"></span>
              <span>Restore all</span>
            </button>
            <button className="button-base"
                    onClick={this.handleClickDestroyAllButton}>
              <span className="octicon octicon-zap"></span>
              <span>Destroy all</span>
            </button>
          </div>
        </div>
        <div className="note-list">
          <div className="note-list-inner">{trashedNoteItems}</div>
        </div>
        <NoteListLink />
      </div>
    );
  }

  handleClickRestoreAllButton() {
    const { notes } = this.props;
    if (notes.every(note => note.trashed === false)) {
      return;
    }

    if (confirm('Are you sure ?')) {
      noteListActions.restoreNoteAll();
    }
  }

  handleClickDestroyAllButton() {
    const { notes } = this.props;
    if (notes.every(note => note.trashed === false)) {
      return;
    }

    if (confirm('Are you sure ?')) {
      noteListActions.destroyNoteAll();
    }
  }

}
