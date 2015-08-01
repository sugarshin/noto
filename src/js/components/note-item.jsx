import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { noteListActions } from '../context';

export default class NoteItem extends Component {

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
      <div className="note-item-container">
        <Link to="notes" params={{ id }}>
          <div>{title}</div>
          <div>{`${body.slice(0, 16)}...`}</div>
          <div>{createdAt}</div>
        </Link>
        <button className="button-base"
                onClick={this._handleClickTrashButton.bind(this)}>
          <span className="octicon octicon-trashcan"></span>
          <span>Trash</span>
        </button>
      </div>
    );
  }

  _handleClickTrashButton() {
    noteListActions.trashNote(this.props.note.id);
  }

}
