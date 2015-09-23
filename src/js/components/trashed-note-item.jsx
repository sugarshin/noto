import React, { Component, PropTypes } from 'react';
import strftime from 'strftime';

import { noteListActions } from '../context';

export default class TrashedNoteItem extends Component {

  static get propTypes() {
    return {
      note: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        body: PropTypes.string,
        createdAt: PropTypes.instanceOf(Date)
      })
    };
  }

  constructor(props) {
    super(props);

    this.handleClickRestoreButton = this.handleClickRestoreButton.bind(this);
    this.handleClickDestroyButton = this.handleClickDestroyButton.bind(this);
  }

  render() {
    const { id, title, body, createdAt } = this.props.note;

    return (
      <div className="trashed-note-item-container note-item-container">
        <div className="note-item-title">{title}</div>
        <div className="note-item-body">{`${body.slice(0, 13)}...`}</div>
        <div className="note-item-created-at">{strftime('%F %T', createdAt)}</div>
        <div className="note-item-button">
          <button className="button-base"
                  onClick={this.handleClickRestoreButton}>
            <span className="octicon octicon-mail-reply"></span>
            <span>Restore</span>
          </button>
          <button className="button-base"
                  onClick={this.handleClickDestroyButton}>
            <span className="octicon octicon-zap"></span>
            <span>Destroy</span>
          </button>
        </div>
      </div>
    );
  }

  handleClickRestoreButton() {
    noteListActions.restoreNote(this.props.note.id);
  }

  handleClickDestroyButton() {
    if (confirm('Are you sure ?')) {
      noteListActions.destroyNote(this.props.note.id);
    }
  }

}
