import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import TrashedNoteItem from './trashed-note-item';

import { noteListActions } from '../context';

export default class TrashedNoteItemList extends Component {

  static get propTypes() {
    return {
      notes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        body: PropTypes.string,
        createdAt: PropTypes.string,
        trashed: PropTypes.bool,
        tags: PropTypes.arrayOf(PropTypes.string)
      }))
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { notes } = this.props;
    const trashedNoteItems = notes.map(note => {
      if (note.trashed === true) {
        return <TrashedNoteItem note={note} key={note.id} />;
      }
    });

    return (
      <div className="trashed-note-list-container note-list-container">
        <div className="note-list-header">
          <div className="note-list-link">
            <ul>
              <li>
                <Link to="index">
                  <span className="octicon octicon-repo"></span>
                </Link>
              </li>
              <li>
                <Link to="trashed-notes">
                  <span className="octicon octicon-trashcan"></span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="note-list-controller">
            <button className="button-base"
                    onClick={this._handleClickRestoreAllButton}>
              <span className="octicon octicon-mail-reply"></span>
              <span>Restore all</span>
            </button>
            <button className="button-base"
                    onClick={this._handleClickDestroyAllButton}>
              <span className="octicon octicon-zap"></span>
              <span>Destroy all</span>
            </button>
          </div>
        </div>
        <div className="note-list">
          <div className="note-list-inner">{trashedNoteItems}</div>
        </div>
      </div>
    );
  }

  _handleClickRestoreAllButton() {
    noteListActions.restoreNoteAll();
  }

  _handleClickDestroyAllButton() {
    if (confirm('Are you sure ?')) {
      noteListActions.destroyNoteAll();
    }
  }

}
