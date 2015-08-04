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
        checked: PropTypes.bool,
        tags: PropTypes.arrayOf(PropTypes.string)
      })
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { id, title, body, createdAt, checked } = this.props.note;

    return (
      <div className="note-item-container">
        <Link to="notes" params={{ id }}>
          <div className="note-item-title">{title}</div>
          <div className="note-item-body">{`${body.slice(0, 13)}...`}</div>
          <div className="note-item-created-at">{createdAt}</div>
        </Link>
        <div className="note-item-button">
          <div className="note-item-button-checkbox"
            // todo
            style={{
              float: 'left',
              width: '32px',
              textAlign: 'left',
              margin: '8px 0 0 8px'
            }}>
            <input type="checkbox"
                   checked={!!checked}
                   ref="checkbox"
                   onChange={this._handleChangeCheckbox.bind(this)}/>
          </div>

          <button className="button-base"
                  onClick={this._handleClickTrashButton.bind(this)}>
            <span className="octicon octicon-trashcan"></span>
            <span>Trash</span>
          </button>
        </div>
      </div>
    );
  }

  _handleChangeCheckbox() {
    noteListActions.toggleCheckNote(this.props.note.id);
  }

  _handleClickTrashButton() {
    noteListActions.trashNote(this.props.note.id);
  }

}
