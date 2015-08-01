import React, { Component, PropTypes } from 'react';

import { noteListActions } from '../context';

export default class TrashedNoteItem extends Component {

  static get propTypes() {
    return {
      note: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        body: PropTypes.string,
        createdAt: PropTypes.string,
        trashed: PropTypes.bool,
        tags: PropTypes.arrayOf(PropTypes.string)
      })
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { id, title, body, createdAt } = this.props.note;

    return (
      <div className="trashed-note-item-container">
        <div>{title}</div>
        <div>{`${body.slice(0, 16)}...`}</div>
        <div>{createdAt}</div>
        <button className="button-base"
                onClick={this._handleClickRestoreButton.bind(this)}>
          <span className="octicon octicon-mail-reply"></span>
          <span>Restore</span>
        </button>
        <button className="button-base"
                onClick={this._handleClickDestroyButton.bind(this)}>
          <span className="octicon octicon-zap"></span>
          <span>Destroy</span>
        </button>
      </div>
    );
  }

  _handleClickRestoreButton() {
    noteListActions.restoreNote(this.props.note.id);
  }

  _handleClickDestroyButton() {
    if (confirm('Are you sure ?')) {
      noteListActions.destroyNote(this.props.note.id);
    }
  }

}
