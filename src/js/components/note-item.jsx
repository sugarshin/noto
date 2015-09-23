import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import strftime from 'strftime';

import { noteListActions } from '../context';

export default class NoteItem extends Component {

  static get propTypes() {
    return {
      note: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        body: PropTypes.string,
        createdAt: PropTypes.instanceOf(Date),
        checked: PropTypes.bool
      })
    };
  }

  constructor(props) {
    super(props);

    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.handleClickTrashButton = this.handleClickTrashButton.bind(this);
  }

  render() {
    const { id, title, body, createdAt, checked } = this.props.note;

    return (
      <div className="note-item-container">
        <Link to="notes" params={{ id }}>
          <div className="note-item-title">{title}</div>
          <div className="note-item-body">{body}</div>
          <div className="note-item-created-at">{strftime('%F %T', createdAt)}</div>
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
                   checked={checked}
                   ref="checkbox"
                   onChange={this.handleChangeCheckbox}/>
          </div>

          <button className="button-base"
                  onClick={this.handleClickTrashButton}>
            <span className="octicon octicon-trashcan"></span>
            <span>Trash</span>
          </button>
        </div>
      </div>
    );
  }

  handleChangeCheckbox() {
    noteListActions.toggleCheckNote(this.props.note.id);
  }

  handleClickTrashButton() {
    noteListActions.trashNote(this.props.note.id);
  }

}
